const express = require("express");
const {users} = require("./data/users.json");
const {books} = require("./data/books.json");

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
    
/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public 
 * Parameters: None
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})




app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})