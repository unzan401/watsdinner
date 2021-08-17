<template>
  <div class="Watsdinner">
    <div class="container" v-if="open == 1">
      <h1>為煩惱吃什麼的人給個方向！</h1>
      <p>中餐吃什麼？晚餐吃什麼？這是大家常見的問題！</p>
      <p>但一直都沒有合適的決策方式，如果能有人幫我決定我想吃的食物就好了。</p>
      <p>透過一連串的選項篩選出可能想吃的食物，最終解決亙古無解的吃什麼問題。</p>
      <div class="col-12">
        <button type="button" @click="start()" class="btn btn-success w-100">
          立刻開始
        </button>
      </div>
    </div>

    <div class="container" v-if="open == 2">
      <div class="row" style="min-height: 200px; align-items: center">
        <h1>{{ question }}</h1>
        <div class="col-6">
          <button
            type="button"
            @click="answer(true)"
            class="btn btn-primary w-100"
          >
            {{ Answer1 }}
          </button>
        </div>
        <div class="col-6">
          <button
            type="button"
            @click="answer(false)"
            class="btn btn-secondary w-100"
          >
            {{ Answer2 }}
          </button>
        </div>
        <div class="col-12">
          <button
            type="button"
            @click="answer('nvm')"
            class="btn btn-success w-100"
          v-if="tag=end">
            都可以
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade" tabindex="-1" id="questionnaire">
      <div class="modal-dialog modal-fullscreen align-items-center">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">問卷調查</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <h1>在開始之前，協助我們預測得更好！</h1>
              <p>
                在下列問題中，你認為針對<span
                  class="text-danger"
                  style="font"
                  >{{ food }}</span
                >而言，<span class="text-danger" style="font">{{ food }}</span
                >應該會在哪個選項中出現？
              </p>
              <div
                class="w-100"
                style="height: 1px; background-color: #bbbbbb; margin: 20px 0"
              ></div>
              <div class="row" style="min-height: 200px; align-items: center">
                <h1>{{ testQuestion.question }}</h1>
                <div class="col-6">
                  <button
                    type="button"
                    @click="testAnswer(true)"
                    class="btn btn-primary w-100"
                  >
                    {{ testQuestion.Answer1 }}
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="button"
                    @click="testAnswer(false)"
                    class="btn btn-secondary w-100"
                  >
                    {{ testQuestion.Answer2 }}
                  </button>
                </div>
                <div class="col-12">
                  <button
                    type="button"
                    @click="testAnswer('nvm')"
                    class="btn btn-success w-100"
                  >
                    都可以
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../model/FirebaseModel";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";



var myModal;
export default {
  name: "Watsdinner",
  data: () => {
    return {
      question: "",
      Answer1: "",
      Answer2: "",
      question_count: 1,
      question_length: 1,
      data: [
        {
          question: "",
          Answer1: "",
          Answer2: "",
        },
      ],
      foods: {},
      tag: "",
      tagsfoods: [],
      open: 1,
      food: "",
      testQuestion: [
        {
          question: "",
          Answer1: "",
          Answer2: "",
        },
      ],
    };
  },
  methods: {
    start: function () {
      this.open = 2;
      myModal.show();
    },
    testAnswer: function (statement) {
      var Ref = {
        food: this.food,
        question: this.testQuestion.question,
        answer: statement,
      };
      firebase.database().ref("watsdinner/questionnaire").push(Ref);
      myModal.hide();
    },
    answer: function (statement) {
      if (this.tag == "end") {
        this.refresh();
      } else {
        if (statement == "nvm") {
          this.nextQuestion();
        } else {
          this.checkTagsfoods(this.question_count - 1, statement);
          this.nextQuestion();
        }
      }
    },
    checkTagsfoods: function (num, statement) {
      var tagsfoods = this.data[num].tagsfoods;
      var independentfoods = this.data[num].independentfoods;
      if (tagsfoods == undefined) {
        tagsfoods = [];
      }
      if (independentfoods == undefined) {
        independentfoods = [];
      }
      if (statement) {
        this.foods = this.foods.filter(
          (x) => tagsfoods.includes(x) | independentfoods.includes(x)
        );
      } else {
        this.foods = this.foods.filter((x) => tagsfoods.includes(x) === false);
      }
    },
    nextQuestion: function () {
      var loop = true;
      while (loop) {
        if (
          (this.foods.length <= 5) |
          (this.question_count == this.question_length - 1)
        ) {
          this.getResult();
          this.question_count = 1;
          break;
        } else {
          var tagsfoods = this.data[this.question_count].tagsfoods;
          var independentfoods =
            this.data[this.question_count].independentfoods;
          if (tagsfoods == undefined) {
            tagsfoods = [];
          }
          if (independentfoods == undefined) {
            independentfoods = [];
          }
          if (
            (this.foods.filter(
              (x) => tagsfoods.includes(x) | independentfoods.includes(x)
            ).length ==
              0) |
            this.foods.filter((x) => tagsfoods.includes(x) === false)
          ) {
            this.question_count++;
            continue;
          } else {
            this.question = this.data[this.question_count].question;
            this.Answer1 = this.data[this.question_count].Answer1;
            this.Answer2 = this.data[this.question_count].Answer2;
            this.question_count++;
            break;
          }
        }
      }
    },
    getResult: function () {
      if (this.foods.length == 0) {
        this.question = "看來你今天一點也不想吃。";
      } else {
        this.question = "我認為你可能想吃" + this.foods + "。";
        
      }
      this.Answer1 = "太棒了";
      this.Answer2 = "天啊，我不要";
      this.tag = "end";
    },
    refresh: function () {
      firebase
        .database()
        .ref("watsdinner/data")
        .once("value", (snapshot) => {
          this.data = snapshot.val();
          this.data.sort(() => Math.random() - 0.5);
          this.question = this.data[0].question;
          this.Answer1 = this.data[0].Answer1;
          this.Answer2 = this.data[0].Answer2;
          this.question_length = this.data.length;
          this.tagsfoods = this.data[0].tagsfoods;
        });
      firebase
        .database()
        .ref("watsdinner/foods")
        .once("value", (snapshot) => {
          this.foods = snapshot.val();
          this.foods = this.foods.map((item) => item.name);
        });
      this.tag = "";
    },
  },
  created() {
    firebase
      .database()
      .ref("watsdinner/data")
      .once("value", (snapshot) => {
        this.data = snapshot.val();
        this.data.sort(() => Math.random() - 0.5);
        this.question = this.data[0].question;
        this.Answer1 = this.data[0].Answer1;
        this.Answer2 = this.data[0].Answer2;
        this.tagsfoods = this.data[0].tagsfoods;
        this.question_length = this.data.length;
        this.testQuestion = this.data[this.data.length - 1];
      });
    firebase
      .database()
      .ref("watsdinner/foods")
      .once("value", (snapshot) => {
        this.foods = snapshot.val();
        this.foods = this.foods.map((item) => item.name);
        this.food = this.foods[Math.floor(this.foods.length * Math.random())];
      });
  },
  mounted() {
    myModal = new bootstrap.Modal(document.getElementById("questionnaire"));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-12,
.col-6 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.Watsdinner {
  padding: 100px 0;
}

h1 {
  margin-bottom: 2rem;
}
</style>
