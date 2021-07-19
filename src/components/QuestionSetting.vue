<template>
  <div class="QuestionSetting">
    <div class="container">
      <div class="row" id="question_form" v-if="typein == false">
        <div class="col-12">
          資料庫已經有的分類問題：
          <ol>
          <li v-for="question in questions" :key="question.id">
            {{ question }}
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
      <div class="row bg-white" style="position:sticky;top:50px">
        <div
          class="w-100"
          style="height: 1px; background-color: #bbbbbb; margin: 5px 0"
        ></div>
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
      <div
        class="w-100"
        style="height: 1px; background-color: #bbbbbb; margin: 15px 0"
      ></div>
      <div class="row" v-if="typein">
        <div class="col-12">
          <h4>請勾選符合問題的食物</h4>
        </div>
        <div class="col-12 fooditems" v-for="item in foods" :key="item.id">
          {{ item }}
          <input type="checkbox" @click="checkAnswer(item)" />
        </div>
        <div class="col-12">
          <div
            class="w-100"
            style="height: 1px; background-color: #bbbbbb; margin: 3px"
          ></div>
          <p>已選中：{{ data.tagsfoods }}</p>
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
      },
      foods: [],
      len: 0,
      questions:[]
    };
  },
  methods: {
    typeinStart: function () {
      if((this.data.question!=="") &  (this.data.Answer1!=="") & (this.data.Answer2!=="")){
        this.typein = true;
      }else{
        alert("請輸入問題與其回答選項！")
      }
    },
    checkAnswer: function (food) {
      if (this.data.tagsfoods.indexOf(food) != -1) {
        this.data.tagsfoods.splice(this.data.tagsfoods.indexOf(food), 1);
      } else {
        this.data.tagsfoods.push(food);
      }
    },
    update: function () {
      var Ref = {};
      console.log(this.data);
      Ref[this.len] = this.data;
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
        });
      firebase
        .database()
        .ref("watsdinner/data")
        .once("value", (snapshot) => {
          this.len = snapshot.val().length;
          this.questions = snapshot.val().map((item)=>item.question)
        });
      this.typein = false;
      this.data = {
        question: "",
        Answer1: "",
        Answer2: "",
        tagsfoods: [],
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
      });

    firebase
      .database()
      .ref("watsdinner/data")
      .once("value", (snapshot) => {
        this.len = snapshot.val().length;
        this.questions = snapshot.val().map((item)=>item.question)
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question_form .col-12,
#question_form .col-6,
#question_form input {
  margin-top: 10px;
  margin-bottom: 10px;
}
.fooditems:nth-of-type(even) {
  background: #EEEEEE;
}

.fooditems {
  padding: 8px;
}
</style>
