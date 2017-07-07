var firebase = require("firebase")
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.set('port', (process.env.PORT || 5001))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);

var database = firebase.database();

function writeRecipeData(recipeId, recipe) {
  firebase.database().ref('recipes/' + recipeId).set( recipe );
}

var recipe = {
    "name": "Orange Juice",
    "ingredients": [
        "cheeze",
        "bread",
        "tomato",
        "lattuce"
    ],
    "steps": [
        "take bread and put cheeze on it", "cut slices of tomato and take some lattuce", "add tomato and lattuce on the bread and grill it finally"
    ]
};


app.get('/', function (req, res) {
	res.send('Firebase App Fest Test Server')
})

app.get('/insertData', function (req, res) {
	res.send(writeRecipeData("003", recipe))
	//res.send('Firebase App Fest Test Server Insert Data')
})

app.get('/getData/:recipeId', function (req, res) {
	var collisionsRef = firebase.database().ref('/recipes/' + req.params.recipeId).once('value').then((data) => {
		res.send(data)
	})
})

app.post('/api_ai_webhook')

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

