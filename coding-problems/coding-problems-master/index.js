const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


app = express();

app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === "/api/subscriptions/webhook") {
  	next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

mongoose.connect(process.env.DB,{ useNewUrlParser: true ,useUnifiedTopology: true})
				.then(()=> console.log("DB Conneted"))
				.catch((err)=> console.log(err))


app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/questions',require('./routes/questions.js'));
app.use('/api/subscriptions',require('./routes/subscription.js'));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>console.log(`Listening at port ${PORT}`))