const http = require('node:http');
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plane; charset=utf-8');

    if(req.url == '/'){
        res.statusCode = 200;
        res.end('Bienvenido a mi página de inicio.')
    } else if(req.url == '/contacto'){
        res.statusCode = 200;
        res.end('Contacto')
    } else if(req.url == '/logo'){
        fs.readFile('MotosGimenezLogo.png', (err, data)=>{
            if(err){
                res.statusCode = 500;
                res.end('500 Internar Server Error')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    } 
    
    else {
        res.statusCode = 404
        res.end('404')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
    console.log(`Server listening on port http://localhost:${desiredPort}`)
})