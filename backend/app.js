const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');

app.use(express.json())
app.use(cookieparser());

const errorMiddleware = require('./middleware/error');
const course = require('./routes/courseRoute.js')
const user = require('./routes/userRoute.js');



app.use("/api/v1",course);
app.use("/api/v1",user);

app.use(errorMiddleware);

module.exports = app