// Firebase App (the core Firebase SDK) is always required and must be listed first
// 這個等於當初第一個 script 標籤
import firebase from "firebase/app";

// 後面都是 import 第一個後才能接著 import 的各模塊
// 這個等於當初第二個 script 標籤

// Add the Firebase products that you want to use
// 這兩個剛好是我們後面需要的模塊 !! 一個是身分驗證，一個是 cloud firestore 雲端資料庫
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATyjHj-0-GJHEHT6MynSrTGb5xLWOzP88",
    authDomain: "watsdinner.firebaseapp.com",
    databaseURL: "https://watsdinner-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "watsdinner",
    storageBucket: "watsdinner.appspot.com",
    messagingSenderId: "515938229741",
    appId: "1:515938229741:web:534f9b05117b5265559be4"
    };
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}