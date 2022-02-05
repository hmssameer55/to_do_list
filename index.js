const express = require('express')
const bodyParser = require('body-parser')
const date = require('./date')
const makeDbConnection = require('./utils/db')
const item = require('./models/list.schema')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

  
const item1 = new item({
    name: "Welcome to our to_do_list "
})

const item2 = new item({
    name: "Click the + button to add items"
})

const item3 = new item({
    name: "click the delete button to delete items "
})

const defaultItems = [item1, item2, item3]


app.get("/", async (req, res) => {
    let day = date()
    try {
        const items = await item.find()
        if (items.length === 0) {
            item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    return res.redirect("/")
                }
                return res.render("days", { title: day, newItem: items, route: "/" })
            })
        } else {
            return res.render("days", { title: day, newItem: items, route: "/" })
        }
    } catch (err) {
        console.log(err)
    }
})

app.post("/", async (req, res) => {

    let itemName = req.body.newItem

    if (itemName == "") {
        res.redirect("/")
        return
    }
    const newItem = new item({
        name: itemName
    })

    await newItem.save()
    res.redirect("/")
})

app.post("/delete", async (req, res) => {
    const checkItem = req.body.dltbtn
    try {
        await item.findByIdAndRemove(checkItem)
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening at port 3000")
    makeDbConnection()
})

