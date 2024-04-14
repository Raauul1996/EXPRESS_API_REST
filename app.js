const express = require('express');
const allBooks = require('./books.json')
const crypto = require('node:crypto');
const { validateBook, validatePartialBook } = require('./bookSchema');

const app = express();
app.use(express.json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 4321

app.get('/', (req, res) => {
    res.json({message:'hola mundo'})
})

app.get('/books', (req, res) => {
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

app.get('/books/:id', (req, res)=>{
    const {id} = req.params;
    const book = allBooks.find(book => book.id == id)
    if (book) {
        return res.json(book)
    } else {
        res.status(404).json({message: 'Book not found'})
    }
})

app.post('/books', (req, res) => {
    const result = validateBook(req.body)

    if(!result.success) {
        res.status(400).json({error: JSON.parse(result.error.message)})

    }
   
    const newBook = {
        id: crypto.randomUUID(),
        ...result.data
    }

    allBooks.push(newBook)

    res.status(201).json(newBook)
})

app.patch('/books/:id', (req, res)=>{
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


app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})