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
const fs = require('fs');
var serviceAccount = require("./reactauthtest-13cc8-firebase-adminsdk-9i5he-73f9f7a444.json");
const { machineLearning } = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reactauthtest-13cc8.firebaseio.com"
});
/* 
====================================================================================
   User Data json file. replace 'user_details.json' with correct path
===================================================================================
*/
let rawdata = fs.readFileSync('user_details.json');
let user_details = JSON.parse(rawdata);

function createAuthUser(userdata) {
    /*
    userdata =>  { email : "123ed@uomr.lk" , password  : "passwrd123"}
    */
    return admin.auth().createUser(userdata)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
        })
        .catch(function (error) {
            console.log('Error creating new user:', error);
        });
}

async function createBulkUsers() {
    for (i = 0; i < 1; i++) {
        var user  = user_details["users"][i];
        var userdata = {
            email: user['email'],
            password: user['password']
        }
        await createAuthUser(userdata);
    }
    console.log("-------------------------Finished Job---------------------------")
}

createBulkUsers();

/* //Quiz script part
async function createDummyQuiz(quizcat) {
    
    var collection = db.collection(quizcat);
    for (i = 0; i < 30; i++) {
        var data = {
            collection : quizcat,
            image: '',
            hardness: 'Medium',
            sinhala: { description: '', choices: { D: '', C: '', B: '', A: '', E: '' } },
            english: {
                description: 'Let $$m,n$$  be two positive integers such that $mn\\ =\\ 30!$ and highest common factor of $m$ and $n$ is $1$. Find the number of possible values for $\\frac{m}{n}$ . ',
                choices: {
                    D: '0',
                    C: Math.floor(Math.random()*110),
                    B: '512',
                    A: Math.floor(Math.random()*110),
                    E: 'Correct answer is not given'
                }
            },
            tamil: { description: '', choices: { D: '', C: '', B: '', A: '', E: '' } },
            correct: ''
        }

        if(i<10){
            data['hardness'] = "Easy";
        }else if(i>=10 & i<20){
            data['hardness'] = "Medium";
        }else{
            data['hardness'] = "Hard";
        }

        await addQuiz(collection, data)
    }
}

var db = admin.firestore();
function addQuiz(collection, data) {
    return collection.add(data).then((snapshot) => {
            console.log(snapshot.id);
        }
    );
}

*/