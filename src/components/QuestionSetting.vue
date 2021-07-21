<template>
  <div class="QuestionSetting">
    <div class="container">
      <div class="row" id="question_form" v-if="typein == false">
        <div class="col-12">
          資料庫已經有的分類問題：
          <ol>
            <li v-for="(question, index) in questions" :key="question.id">
              <a href="#" @click="changeQuestion(index)">{{ question }}</a>
            </li>
          </ol>
        </div>
        <div class="col-12">
          分類用的問題：<input
            type="text"
            v-model="data.question"
            class="w-100"
            placeholder="例如：想吃中式還是異國料理？"
            required
          />
        </div>
        <div class="col-6">
          符合答案<input
            type="text"
            v-model="data.Answer1"
            class="w-100"
            placeholder="例如：中式"
            required
          />
        </div>
        <div class="col-6">
          不符合答案<input
            type="text"
            v-model="data.Answer2"
            class="w-100"
            placeholder="例如：異國料理"
            required
          />
        </div>

        <div class="col-12">
          <button
            type="submit"
            @click="typeinStart()"
            class="btn btn-success w-100"
          >
            確定
          </button>
        </div>
      </div>
      <div class="row bg-white" style="position: sticky; top: 50px;padding:10px 0;margin-top:10px;margin-bottom:10px;border-top:#DDDDDD 1px solid;border-bottom:#DDDDDD 1px solid;">
        <h3 class="mt-2">預覽</h3>
        <h1>{{ data.question }}</h1>
        <div class="col-6">
          <button type="button" class="btn btn-primary w-100">
            {{ data.Answer1 }}
          </button>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-secondary w-100">
            {{ data.Answer2 }}
          </button>
        </div>
      </div>
      <div class="row" v-if="typein">
        <div class="col-12">
          <h4>請勾選符合問題的食物</h4>
        </div>
        <table class="w-100">
          <tr class="fooditems" v-for="(food, index) in foods" :key="food.id">
            <td class="text-end">{{ food }}</td>
            <td>
              <div class="form-check form-check-inline">
                <input
                  :name="'radio' + index"
                  type="radio"
                  :id="'radio' + index + '1'"
                  value="1"
                  v-model="foodstype[index]"
                />
                <label
                  class="form-check-label"
                  :for="'radio' + index + '1'"
                  style="margin-right: 3rem"
                  >{{ data.Answer1 }}
                </label>
                <input
                  :name="'radio' + index"
                  type="radio"
                  :id="'radio' + index + '2'"
                  value="0"
                  v-model="foodstype[index]"
                  checked
                />
                <label
                  class="form-check-label"
                  :for="'radio' + index + '2'"
                  style="margin-right: 3rem"
                  >{{ data.Answer2 }}</label
                >
                <input
                  :name="'radio' + index"
                  type="radio"
                  :id="'radio' + index + '3'"
                  value="nvm"
                  v-model="foodstype[index]"
                />
                <label
                  class="form-check-label"
                  :for="'radio' + index + '3'"
                  style="margin-right: 3rem"
                  >兩個選項都符合</label
                >
              </div>
            </td>
          </tr>
        </table>
        <div class="col-12">
          <div
            class="w-100"
            style="height: 1px; background-color: #bbbbbb; margin: 3px"
          ></div>
          <p>{{ data.Answer1 }}：{{ data.tagsfoods }}</p>
          <p>兩項都符合的食物：{{ data.independentfoods }}</p>
          <button type="button" @click="update()" class="btn btn-success w-100">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../model/FirebaseModel";

export default {
  name: "QuestionSetting",
  data: () => {
    return {
      typein: false,
      data: {
        question: "",
        Answer1: "",
        Answer2: "",
        tagsfoods: [],
        independentfoods: [],
      },
      foods: [],
      foodstype: [],
      len: 0,
      questions: [],
    };
  },
  watch: {
    foodstype: {
      handler: function () {
        this.checkAnswer();
      },
      deep: true,
    },
  },
  methods: {
    typeinStart: function () {
      if (
        (this.data.question !== "") &
        (this.data.Answer1 !== "") &
        (this.data.Answer2 !== "")
      ) {
        this.typein = true;
      } else {
        alert("請輸入問題與其回答選項！");
      }
    },
    changeQuestion: function (index) {
      firebase
        .database()
        .ref("watsdinner/data")
        .once("value", (snapshot) => {
          this.data = snapshot.val()[index];
          this.foodstype = this.foodstype.map((x, index) => {
            if (this.data.tagsfoods.includes(this.foods[index])) {
              return "1";
            } else if (this.data.independentfoods.includes(this.foods[index])) {
              return "nvm";
            } else {
              return "0";
            }
          });
        });
      this.typein = true;
      this.changein = true;
      this.questionIndex = index;
    },
    checkAnswer: function () {
      this.data.tagsfoods = this.foods.filter(
        (food) => this.foodstype[this.foods.indexOf(food)] == "1"
      );
      this.data.independentfoods = this.foods.filter(
        (food) => this.foodstype[this.foods.indexOf(food)] == "nvm"
      );
    },
    update: function () {
      var Ref = {};
      if (this.changein) {
        Ref[this.questionIndex] = this.data;
      } else {
        Ref[this.len] = this.data;
      }
      firebase.database().ref("watsdinner/data").update(Ref);

      this.refresh();
    },
    refresh: function () {
      firebase
        .database()
        .ref("watsdinner/foods")
        .once("value", (snapshot) => {
          this.foods = snapshot.val();
          this.foods = this.foods.map((item) => item.name);
          this.foodstype = this.foods.map(() => "0");
        });
      firebase
        .database()
        .ref("watsdinner/data")
        .once("value", (snapshot) => {
          this.len = snapshot.val().length;
          this.questions = snapshot.val().map((item) => item.question);
        });
      this.typein = false;
      this.data = {
        question: "",
        Answer1: "",
        Answer2: "",
        tagsfoods: [],
        independentfoods: [],
      };
    },
  },
  created() {
    firebase
      .database()
      .ref("watsdinner/foods")
      .once("value", (snapshot) => {
        this.foods = snapshot.val();
        this.foods = this.foods.map((item) => item.name);
        this.foodstype = this.foods.map(() => "0");
      });

    firebase
      .database()
      .ref("watsdinner/data")
      .once("value", (snapshot) => {
        this.len = snapshot.val().length;
        this.questions = snapshot.val().map((item) => item.question);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question_form .col-12,
#question_form .col-6,
#question_form input {
  margin-top: 20px;
  margin-bottom: 20px;
}
.fooditems:nth-of-type(even) {
  background: #eeeeee;
}

.fooditems {
  height: 3.5rem;
}
</style>
