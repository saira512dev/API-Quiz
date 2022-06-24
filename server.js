const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const PORT = 8000

const questions = [
    {
        'question': '_____ in JS, have no properties',
        'choices': ["arrays","strings","null","sets"],
        'answer_index':2,
        'info' : "Null and Undefined in Javascript has no properties"
    },
    {
        'question': 'Which of the following array methods return undefined?',
        'choices': ["map","reduce","forEach","filter"],
        'answer_index':2,
        'info' : "The forEach() method executes a provided function once for each array element.It return undefined and is not chainable"
    },
    {
        'question': 'Which of the following is NOT a possible states of a promise Object?',
        'choices': ["rejected","initial","rejected","pending"],
        'answer_index':1,
        'info' : "Pending is the initial state of a promise object"
    },
    {
        'question': 'Which of the following statements is false?',
        'choices': ["Fetch returns a promise object","await fetch returns a promise object","await fetch returns a complete response object","await fetch makes asynchronous code look like synchronous"],
        'answer_index':1,
        'info' : "Await fetch stops the execution of the asynchronous function until the promise is resolved and returns a complete response object"
    },
    {
        'question': 'Is it allowed to use double quotes around property names of an object?',
        'choices': ["Yes","No"],
        'answer_index':0,
        'info' : "When the property name has more than one word, it is enclosed in quotes and is accessed using bracket notation"
    },
    {
        'question': 'What is a settled promise? (Choose the most suitable answer)',
        'choices': ["A promise that is rejected","A promise that is resolved", "A promise that is either resolved or rejected","Any promise"],
        'answer_index':2,
        'info' : "A promise that is either resolved or rejected is called 'settled'. A fulfilled promise is the one which is resolved."
    },
    {
        'question': 'Which of the following statements is false about prototypes in JS?',
        'choices': ["Prototypes are used to create relationship between objects","Prototype in itself is a class", "Prototypes are used to share properties between objects", "Prototypes are used to delegate bhaviour between objects"],
        'answer_index':1,
        'info' : "The prototype is an object that is associated with every functions and objects by default in JavaScript."
    },
    {
        'question': 'Which of the following is NOT a static method in the promise class?',
        'choices': ["Promise.any()","Promise.all()", "Promise.race()", "Promise.init()"],
        'answer_index':3,
        'info' : "Promise API provides 6 static methods. They are :Promise.any(),Promise.all(),Promise.allSettled(), Promise.race(),Promise.resolve(),Promise.reject() "
    },
    {
        'question': 'Which of the following is NOT a main principle of OOP in JS?',
        'choices': ["polymorphism","abstraction", "encapsulation", "Prototypes"],
        'answer_index':3,
        'info' : "Promise API provides 6 static methods. They are :Promise.any(),Promise.all(),Promise.allSettled(), Promise.race(),Promise.resolve(),Promise.reject() "
    },
    {
        'question': 'Which of the following is NOT a String method in JS?',
        'choices': ["slice","indexOf", "length", "charAt"],
        'answer_index':3,
        'info' : "Length is a string property, not a method."
    },
]
app.get('/',(req, res) => {
    console.log("HAAAI")
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/js',(req, res) => {
    res.json(questions)
})

app.listen(process.env.PORT || PORT,() => {
    console.log("SERVER IS UP & RUNNING");
})