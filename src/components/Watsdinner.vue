<template>
  <div class="Watsdinner d-none">
    <div class="container">
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
          >
            都可以
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../model/FirebaseModel";

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
    };
  },
  methods: {
    answer: function (statement) {
      if (this.tag == "end") {
        this.refresh();
      } else {
        if (statement == "nvm") {
          this.nextQuestion();
        } else {
          console.log(this.tagsfoods);
          this.foods = this.foods.filter(
            (x) =>
              this.data[this.question_count - 1].tagsfoods.includes(x) ===
              statement
          );
          this.nextQuestion();
        }
      }
    },
    nextQuestion: function () {
      var loop = true;

      while (loop) {
        console.log(this.question_count);
        if (
          (this.foods.length <= 5) |
          (this.question_count == this.question_length)
        ) {
          this.getResult();
          this.question_count = 1;
          break;
        } else {
          if (
            this.foods.filter((x) =>
              this.data[this.question_count].tagsfoods.includes(x)
            ).length == 0
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
        this.question = "看來你今天一點也不想吃";
      } else {
        this.question = "我認為你可能想吃" + this.foods;
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
          console.log(this.data[0]);
          document.getElementsByClassName("Watsdinner")[0].className =
            "Watsdinner";
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
        console.log(this.data[0]);
        document.getElementsByClassName("Watsdinner")[0].className =
          "Watsdinner";
      });
    firebase
      .database()
      .ref("watsdinner/foods")
      .once("value", (snapshot) => {
        this.foods = snapshot.val();
        this.foods = this.foods.map((item) => item.name);
      });
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
</style>
