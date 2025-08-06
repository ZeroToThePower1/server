const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({
  origin: 'https://zerotothepower1.github.io'
}));

let messages = [];
function checkingmsg(){
    if (messages.length > 100){
        messages.slice(0,90)
    }
}

app.get('/', (req, res) => {
    if (messages.length > 0){
        res.json(messages);
    };
    checkingmsg()
});

app.post('/', (req, res) => {
    const newMsg = req.body;
    
    if (!newMsg) {
        return res.status(400).json({ error: "No message provided" });
    }
    
    messages.push(newMsg);
    
    res.json({
        messages
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
