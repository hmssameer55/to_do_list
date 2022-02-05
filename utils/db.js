const mongoose = require ('mongoose')

const mongoUrl = "mongodb+srv://hmssameer55:sRRmwwY3GcmbArqR@cluster0.6ghbz.mongodb.net/to_do_list"


const makeDbConnection = () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to DB")
    }).catch(err => {
        console.log("Something went wrong while DB connection", err)
    })

    mongoose.Promise = global.Promise;
}

module.exports = makeDbConnection;
 