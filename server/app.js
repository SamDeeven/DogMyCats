const express = require('express')
const app = express();
const mongoose = require('mongoose')

const PORT = 5000
require('dotenv').config();





require('./models/user')


app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/auth'))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => console.log("Mongo DB is connected"));
mongoose.connection.on("error !!!", (err) => console.log("There is error in the Mongo DB connection", err));


app.listen(PORT,()=>console.log(`Server is connected on PORT: ${PORT}`))


