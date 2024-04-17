const z = require('zod')

const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    photo: z.string().url()
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