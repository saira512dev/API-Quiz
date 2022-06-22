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