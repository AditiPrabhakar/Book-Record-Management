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
 *! Route: /users
 *& Method: GET
 * Description: Get all users
 * Access: Public 
 * Parameters: None
 */
// http://127.0.0.1:8081/users

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

/**
 *! Route: /users/:id
 *& Method: GET
 * Description: Get single user by it's id
 * Access: Public 
 * Parameters: Id
 */

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found.",
        data: user,
    });
})

/**
 *! Route: /users
 *& Method: POST
 * Description: Create a new user
 * Access: Public 
 * Parameters: None
 */

app.post("/users", (req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body
    const user = users.find((each) => each.id === id);

    if(user)
    {
        res.status(404).json({
            success: false,
            message: "User With This ID Already Exists.",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: users,
    })
})

/**
 *! Route: /users/:id
 *& Method: PUT
 * Description: Updating a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each) => each.id === id);

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
    const updateUserData = users.map((each) => {
        if(each.id === id)
        {
            return {
                //* Can't write this vice-versa (each -> key, data -> value)
                ...each, //each -> name, id, surname..etc
                ...data, //spread operator as they will be updating just part of data
            }
        }
        return each;
    });
    res.status(200).json({
        success: true,
        message: "User Updated",
        data: updateUserData,
    })
 })

 /**
 *! Route: /users/:id
 *& Method: DELETE
 * Description: Deleting a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
    //not complete yet.
 })

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})