/* Packages */
const express = require("express")
const cors = require("cors")
const fs = require("fs")

/* App variables */
const app = express()

/* App configurations */
app.use(cors())
app.use(express.static('public'))
const port = process.env.PORT || 8080

/* Sanalista */
let theList = ["Tuttipullo", "Rintapumppu", "Mikko kaahaa synnärille", "Niskakakka", "White noise", "Helistin", "Puklu", "Jokellus"]
let usedList = []

/* Routes definition */
app.get("/", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write(data)
        res.end()
    })
})

app.get("/sanat", (req, res) => {
    if (theList.length === 0) {
        console.log("in if loop")
        theList = usedList
        usedList = []
        console.log("theList", theList)
        console.log("usedList", usedList)
    }
    let wordIndex = Math.floor(Math.random() * Math.floor(theList.length))
    let word = theList[wordIndex]
    usedList.push(theList[wordIndex])
    theList.splice(wordIndex, 1)
    console.log("theList", theList)
    console.log("usedList", usedList)
    res.end(word)
})

/* Server activation */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})