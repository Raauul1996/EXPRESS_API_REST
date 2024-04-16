const {Router} = require('express');
const { db } = require ('../firebase.js');
const crypto = require('node:crypto');
const { validateBook, validatePartialBook } = require('../bookSchema.js');

const router = Router();

router.get('/', (req, res) => {
    res.json('Welcome to my Library API REST')
})

router.get('/books', async (req, res) => {
    const querySnapshot = await db.collection('books').get();

    const allBooks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log(allBooks);
    res.status(201).json(allBooks)
});

/*
router.get('/api/books', (req, res) => {
    const { author } = req.query;

    if (author) {
        console.log(author);
        const filteredBooks = allBooks.filter(
            book => book.author.toLowerCase() === author.toLowerCase()
        );
        return res.json(filteredBooks);
    } else {
        console.log("todos los libros");
        res.json(allBooks);
    }
});
*/

router.get('/books/:id', async (req, res)=>{
    const {id} = req.params;
    const book = await db.collection('books').doc(id).get()
    if (book) {
        const bookData = {
            id: book.id,
            ...book.data()
        }
        console.log(bookData)
        return res.status(200).json(bookData)
    } else {
        res.status(404).json({message: 'Book not found'})
    }
})

router.post('/books', async (req, res) => {
    const result = validateBook(req.body)

    if(!result.success) {
        res.status(400).json({error: JSON.parse(result.error.message)})

    }
   
    const newBook = {
        //id: crypto.randomUUID(),
        ...result.data
    }

    await db.collection('books').add(newBook)

    res.status(201).json(newBook)
})

router.patch('/books/:id', (req, res)=>{
    const result = validatePartialBook(req.body)
    if(!result.success) {
        res.status(400).json({error: JSON.parse(result.error.message)})

    }
    const {id} = req.params;
    const bookIndex = allBooks.findIndex(book => book.id == id)
    if(bookIndex < 0){
        res.status(404).json({message: 'Book not found'})
    } else {
        const updateBook = {
            ...allBooks[bookIndex],
            ...result.data
        }
        
        allBooks[bookIndex] = updateBook //Actualizar DB

        return res.json(updateBook)
    }
})

module.exports = router

