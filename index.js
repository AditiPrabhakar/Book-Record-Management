const express = require("express");
const {users} = require("./data/users.json");
// const {books} = require("./data/books.json");

const usersRoute = require('./routes/users.js');
const booksRoute = require('./routes/books.js');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running.",
        data: "hey",
    });
    //* Can only send one response that's why we prefer json
    // res.status(200).send("Server is up.");
})

app.use('/users', usersRoute);
app.use('/books', booksRoute);
    


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})