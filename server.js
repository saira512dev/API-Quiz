const express = require('express');
const app = express();
const PORT = 8000

const questions = [
    {
        'question': '_____ in JS, have no properties',
        'choices': ["arrays","strings","null","sets"],
        'answer':"null",
        'info' : "Null and Undefined in Javascript has no properties"
    }
]
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api',(req, res) => {
    res.json(questions)
})

app.listen(process.env.PORT || PORT,() => {
    console.log("SERVER IS UP & RUNNING");
})