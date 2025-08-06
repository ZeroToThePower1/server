const fs = require('fs')
const http = require('http')
const port = 300
const host = 'localhost'

const musicFiles = fs.readdirSync('C:\\Users\\hp\\Desktop\\Documents\\learningwebdev')
const filtermedia = musicFiles.filter(f=> f.endsWith('.mp3') || f.endsWith('.m4a'))

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(filtermedia))
})

server.listen(port,host, ()=>{
    console.log(`Server running at http://${host}:${port}`);
});