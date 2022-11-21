const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
// פיצלנו את אינדקס שהיה לנו ל2 חלקים וזה מאפשר לגשת לאקספרס לפני שקוראים לליסטן
