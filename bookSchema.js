const z = require('zod')

const bookSchema = z.object({
    nombre: z.string(),
    author: z.string(),
    foto: z.string().url()
})

function validateBook (book) {
    return bookSchema.safeParse(book)
}

function validatePartialBook (book) {
    return bookSchema.partial().safeParse(book)
}



module.exports = {
    validateBook,
    validatePartialBook
}