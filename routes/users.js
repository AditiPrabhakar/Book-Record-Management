const express = require("express");
const { users } = require("../data/users.json");
const e = require("express");

const router = express.Router();

/**
 *! Route: /
 *& Method: GET
 * Description: Get all users
 * Access: Public 
 * Parameters: None
 */
// http://127.0.0.1:8081/users

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

/**
 *! Route: /:id
 *& Method: GET
 * Description: Get single user by it's id
 * Access: Public 
 * Parameters: Id
 */

router.get('/:id', (req, res) => {
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
 *! Route: /
 *& Method: POST
 * Description: Create a new user
 * Access: Public 
 * Parameters: None
 */

router.post("/", (req, res) => {
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
 *! Route: /:id
 *& Method: PUT
 * Description: Updating a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 router.put("/:id", (req, res) => {
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
 *! Route: /:id
 *& Method: DELETE
 * Description: Deleting a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "User Deleted.",
        data: users,
    })
 })

/**
 *! Route: /subscription-details/:id
 *& Method: GET
 * Description: Get all user subscription details
 * Access: Public 
 * Parameters: ID
 */

 router.get('/subscription-details/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User With This ID Does Not Exist.",
        });
    }
    const getDateInDays = (data = "")=>{
        let date;
        if(data === ""){ //* if we have no data then we'll assign it to today's date
            data = new Date()
        }else{
            data = new Date(data) //* otherwise consider the date given in data
        }

        //~ The floor() function returns the largest integer that is smaller than or equal to the value passed as the argument (i.e.: rounds down the nearest integer).
        //~ ceil() function in C++ returns the smallest integer that is greater than or equal to the value passed as the argument (i.e.: rounds up the nearest integer).
        //^  Calculating days from date:
        let days = Math.floor(data / (1000 * 60 * 60 * 24)) //2.7 of ceil is 3 and of floor is 2
                            //milliseconds*seconds*minute*hours
        return days;
    };

    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };
 })

 module.exports = router;