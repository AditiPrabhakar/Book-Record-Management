const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 *! Route: /
 *& Method: GET
 * Description: Get all books
 * Access: Public 
 * Parameters: None
 */
// http://127.0.0.1:8081/users

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Got All The Books.",
        data: books,
    })
})

/**
 *! Route: /books/issued
 *& Method: GET
 * Description: Getting all issued books
 * Access: Public 
 * Parameters: None
 */
router.get('/issued', (req, res) => {
    // find method returns just a value but we need an array of values now, so we'll use filter
    const userWithTheIssuedBook = users.filter((each) => {
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];

    userWithTheIssuedBook.forEach((each) => {
        const book = books.find((book)=> (book.id === each.issuedBook));

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Book Has Been Issued.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Users With The Issued Books..",
        data: issuedBooks,
    });
})

/**
 *! Route: /:id
 *& Method: GET
 * Description: Get a book by it's id
 * Access: Public 
 * Parameters: Id
 */

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book)
    {
        return res.status(404).json({
            success: false,
            message: "Book With This ID Doesn't Exist.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Found The Book By It's ID.",
        data: book,
    });
})


module.exports = router;