const firebaseConfig = {
    apiKey: "AIzaSyCFPtR8KRSpFBSjXxLcKOmjh00Psmalg90",
    authDomain: "reactauthtest-13cc8.firebaseapp.com",
    databaseURL: "https://reactauthtest-13cc8.firebaseio.com",
    projectId: "reactauthtest-13cc8",
    storageBucket: "reactauthtest-13cc8.appspot.com",
    messagingSenderId: "879127747925",
    appId: "1:879127747925:web:5cb852c6f26cf93f3123dc",
    measurementId: "G-50TZD5275Z"
};

const admin = require('firebase-admin');
var serviceAccount = require("./reactauthtest-13cc8-firebase-adminsdk-9i5he-73f9f7a444.json");
const { machineLearning } = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reactauthtest-13cc8.firebaseio.com"
});

const moment = require('moment');
var userIds = [];
var questionIds = { juniorquiztest: {}, seniorquiztest: {}, superseniorquiztest: {} };
var quizCount = 30;
var levels = ["Easy", "Medium", "Hard"];
var questionCollectionNames = ["juniorquiztest", "seniorquiztest", 'superseniorquiztest']

var db = admin.firestore();

function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    return admin.auth().listUsers(1000, nextPageToken)
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                userIds.push({
                    id : userRecord.uid,
                    email : userRecord.email
                })
            });
            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(function (error) {
            console.log('Error listing users:', error);
        });
}

async function main(){
    await listAllUsers();
    //console.log(userIds)
}

main();

async function loadQuestions() {

    for(i=0; i<questionCollectionNames.length; i++){
        var collection = db.collection(questionCollectionNames[i]);
        await loadEachLevelQuiz(collection, "Easy", questionCollectionNames[i]);
        await loadEachLevelQuiz(collection, "Medium", questionCollectionNames[i]);
        await loadEachLevelQuiz(collection, "Hard", questionCollectionNames[i]);
    }
    //console.log(questionIds);
    mapQuestionUser()
}

function loadEachLevelQuiz(collection, level, name) {
    return collection.where("hardness", "==", level).get().then((snapshot) => {
        var questions = [];
        snapshot.forEach(doc => {
            questions.push({
                id: doc.id
            });
            //console.log(doc.data())
        });
        questionIds[name][level] = questions;
    })
}

loadQuestions()

// As an admin, the app has access to read and write all data, regardless of Security Rules


var collection = db.collection("users");

async function randomSelectFromPool(userId, quizCat, email) {
    var selectedQuestions = [];
    var randomset = selectNRandomNumbers()
    selectedQuestions = selectedQuestions.concat(randomset);
    selectedQuestions = selectedQuestions.concat(randomset);
    selectedQuestions = selectedQuestions.concat(randomset);
    var questions = {};
    
    for(i =0; i<selectedQuestions.length;i++){
        var id = selectedQuestions[i];
        console.log(questionIds[quizCat]["Easy"][id]['id'])
        if(i < 10){
            questions[i+1]={
                flag: false,
                id: questionIds[quizCat]["Easy"][id].id,
                selected: []
            };
        } else if (i >=10 & i < 20){
            questions[i+1]={
                flag: false,
                id: questionIds[quizCat]["Medium"][id].id,
                selected: []
            }
        }else{
            questions[i+1]={
                flag: false,
                id: questionIds[quizCat]["Hard"][id].id,
                selected: []
            }
        }
    };
    console.log("===",userId,email)
    await updateDoc(userId, email, questions)
}

function selectNRandomNumbers() {
    var arr = [];
    while (arr.length < 10) {
        var r = Math.floor(Math.random() * 10);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    //console.log(arr)
    return arr;
}

function updateDoc(userId, email, data) {
    var collection = db.collection("testUsers");
    selectedCollection = "";
    if(email.indexOf("junior")>=0){
        selectedCollection = "junior";
    } else if(email.indexOf("senior")>=0){
        selectedCollection = "senior";
    } else if(email.indexOf("supersenior")>=0){
        selectedCollection = "supersenior";
    }

    //Time settings
    //var now = new Date();
    var startDate = "june 21, 2020 23:54:25"
    var deadline = "june 21, 2020 23:54:25"
    return collection.doc(userId).set({
         email : email,
         collection : selectedCollection,
         deadline : null,
         startTime : null,
         questions : data
    });
    //process.exit();
}


function mapQuestionUser(){
    userIds.forEach(user=>{
        var email = user.email;
        var userId = user.id;

        if(email.indexOf("junior")>=0){
            randomSelectFromPool(userId, "juniorquiztest", email)
        } else if(email.indexOf("senior")>=0){
            randomSelectFromPool(userId, "seniorquiztest", email)
        } else if(email.indexOf("supersenior")>=0){
            randomSelectFromPool(userId, "superseniorquiztest", email)
        }
    });
    console.log("----------------------Job finished!-----------------")
}





