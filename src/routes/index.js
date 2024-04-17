const { Router } = require('express');
const { db } = require('../firebase.js');
const { validateBook, validatePartialBook } = require('../bookSchema.js');

const router = Router();
const library = db.collection('books');

router.get('/', (req, res) => {
    res.json('Welcome to my Library API REST');
});

router.get('/books', async (req, res) => {
    const querySnapshot = await library.get();
    const allBooks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    res.status(200).json(allBooks);
});

router.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await library.doc(id).get();
    
    if (book.data()) {
        const bookData = {
            id: book.id,
            ...book.data()
        };
        res.status(200).json(bookData);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await library.doc(id).get();

    if (book.data()) {
        library.doc(id).delete();
        res.status(200).json({ id, message: 'Book deleted' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.post('/books', async (req, res) => {
    const result = validateBook(req.body);

    if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) });
        return;
    }

    const newBook = {
        id: library.doc().id,
        ...result.data
    };

    await library.doc(newBook.id).set(newBook);
    res.status(201).json(newBook);
});

router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await library.doc(id).get();

    if (book.data()) {
        const validateUpdate = validatePartialBook(req.body);
        
        if (!validateUpdate.success) {
            res.status(400).json({ error: JSON.parse(validateUpdate.error.message) });
            return;
        }

        const updatedBook = {
            ...validateUpdate.data
        };

        await library.doc(id).set(updatedBook, { merge: true });
        res.status(201).json({message: "Updated book successfully"});
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;
