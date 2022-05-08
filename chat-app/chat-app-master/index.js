const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io')
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(process.env.DB_CRED,{ useNewUrlParser: true ,useUnifiedTopology: true})
				.then(()=> console.log("DB Conneted"))
				.catch((err)=> console.log(err))

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(require('./middlewares/auth.js'));

app.use('/',require('./routes/main.js'));
app.use('/users',require('./routes/auth.js'));
app.use('/chat',require('./routes/chat.js'));

io.use(require('./middlewares/auth_io.js'))
require("./config/socket_handler.js")(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log(`Listening on the port ${PORT}`));
