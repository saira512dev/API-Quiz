const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const multer = require('multer');
const upload = multer();
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(upload.array()); 
app.use(express.static('public'));
const { check, validationResult } = require('express-validator');


const PORT = 8000

const questions = [
    {
        'question': '_____ in JS, have no properties',
        'choices': ["1. Arrays","2. Strings","3. Null","4. Sets"],
        'answer_index':2,
        'info' : "Null and Undefined in Javascript has no properties"
    },
    {
        'question': 'Which of the following array methods return undefined?',
        'choices': ["1. map","2. reduce","3. forEach","4. filter"],
        'answer_index':2,
        'info' : "The forEach() method executes a provided function once for each array element.It return undefined and is not chainable"
    },
    {
        'question': 'Which of the following is NOT a possible states of a promise Object?',
        'choices': ["1. rejected","2. initial","3. fulfilled","4. pending"],
        'answer_index':1,
        'info' : "Pending is the initial state of a promise object"
    },
    {
        'question': 'Which of the following statements is false?',
        'choices': ["1. Fetch returns a promise object","2. await fetch returns a promise object","3. await fetch returns a complete response object","4. await fetch makes asynchronous code look like synchronous"],
        'answer_index':1,
        'info' : "Await fetch stops the execution of the asynchronous function until the promise is resolved and returns a complete response object"
    },
    {
        'question': 'Is it allowed to use double quotes around property names of an object?',
        'choices': ["1. Yes","2. No"],
        'answer_index':0,
        'info' : "When the property name has more than one word, it is enclosed in quotes and is accessed using bracket notation"
    },
    {
        'question': 'What is a settled promise? (Choose the most suitable answer)',
        'choices': ["1. A promise that is rejected","2. A promise that is resolved", "3. A promise that is either resolved or rejected","4. Any promise"],
        'answer_index':2,
        'info' : "A promise that is either resolved or rejected is called 'settled'. A fulfilled promise is the one which is resolved."
    },
    {
        'question': 'Which of the following statements is false about prototypes in JS?',
        'choices': ["1. Prototypes are used to create relationship between objects","2. Prototype in itself is a class", "3. Prototypes are used to share properties between objects", "4. Prototypes are used to delegate bhaviour between objects"],
        'answer_index':1,
        'info' : "The prototype is an object that is associated with every functions and objects by default in JavaScript."
    },
    {
        'question': 'Which of the following is NOT a static method in the promise class?',
        'choices': ["1. Promise.any()","2. Promise.all()", "3. Promise.race()", "4. Promise.init()"],
        'answer_index':3,
        'info' : "Promise API provides 6 static methods. They are :Promise.any(),Promise.all(),Promise.allSettled(), Promise.race(),Promise.resolve(),Promise.reject() "
    },
    {
        'question': 'Which of the following is NOT a main principle of OOP in JS?',
        'choices': ["1. polymorphism","2. abstraction", "3. encapsulation", "4. Prototypes"],
        'answer_index':3,
        'info' : "Promise API provides 6 static methods. They are :Promise.any(),Promise.all(),Promise.allSettled(), Promise.race(),Promise.resolve(),Promise.reject() "
    },
    {
        'question': 'Which of the following is NOT a String method in JS?',
        'choices': ["1. slice","2. indexOf", "3. length", "4. charAt"],
        'answer_index':2,
        'info' : "Length is a string property, not a method."
    },
]

MongoClient.connect(
   'mongodb+srv://quiz_user:quizUser_109@clusterquiz.qu2x8.mongodb.net/?retryWrites=true&w=majority'
    ).then((client) => {
    console.log("Connected to Database");
    const db = client.db("QUIZ");
    const scores = db.collection("scores");
    const questions = db.collection("questions");

  
    app.get("/api/scores/all", (req, res) => {
      scores
        .find()
        .sort({score:-1, time:1})
        .toArray()
        .then((results) => {
          res.json(results)
        })
        .catch((error) => console.error(error));
    });
    app.post("/api/scores/add", (req, res) => {
        console.log(req)
        scores.insertOne(req.body)
        .then((result) => {
          res.json("OK")
        })
        .catch((error) => console.error(error));
    });

    app.post("/api/questions/add",[
        check('question').not().isEmpty().withMessage('Question cannot be empty.'),
        check('choices').not().isEmpty().withMessage('Choices cannot be empty.'),
        check('answer_index').not().isEmpty().withMessage('Answer index cannot be empty.'),
        check('info').not().isEmpty().withMessage('Info cannot be empty.'),
    ] ,(req, res) => {
        const errors = validationResult(req);
        console.log(req.body,errors, "HEROKU");
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        questions.insertOne(req.body)
        .then((result) => {
            res.json("OK")
        })
        .catch((error) => console.error(error));
    });
    app.get("/api/questions/:id",(req, res) => {
        console.log(typeof(req.params.id))
        // questions.findOne({"_id" : req.params.id})
        // .then((result) => {
        //    return res.status(200).json(result)
        // })
        // .catch((error) => console.error(error));
    });
    app.put("/api/questions/edit/:id",[
        check('question').exists().withMessage('Question cannot be empty.'),
        check('choices').exists().withMessage('Choices cannot be empty.'),
        check('answer_index').exists().withMessage('Answer index cannot be empty.'),
        check('info').exists().withMessage('Info cannot be empty.'),
    ] ,(req, res) => {
        const errors = validationResult(req);
        console.log(req)
        console.log(ObjectId(req.params.id))
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        questions.updateOne({ "_id" : ObjectId(req.params.id)},{$set : req.body})
        // Send response in here
        .then((result) => {
            res.send('Item Updated!');
        })
        .catch((error) => console.error(error));
    });
    app.get("/api/questions/all", (req, res) => {
        console.log(req)
        questions.
        find()
       // .sort({score:-1, time:1})
        .toArray()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => console.error(error));
    });
    app.post("/api/questions/delete/:id",(req, res) => {
        console.log(req)
        console.log(ObjectId(req.params.id))
        questions.deleteOne({ "_id" : ObjectId(req.params.id)})
        // Send response in here
        .then((results) => {
           return res.status(200).json("DELETED")
        })
        .catch((error) => console.error(error));
    });
  });
  
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/js',(req, res) => {
    res.json(questions)
})

app.listen(process.env.PORT || PORT,() => {
    console.log("SERVER IS UP & RUNNING");
})

