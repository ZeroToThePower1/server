const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({
    origin: "https://zerotothepower1.github.io", // Restrict to your frontend only
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


let messages = [];
const MAX_MESSAGES = 100;


function cleanMessages() {
    if (messages.length > MAX_MESSAGES) {
       
        messages = messages.slice(-90);
    }
}


app.get('/', (req, res) => {
    try {
        cleanMessages();
        res.json(messages);
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/', (req, res) => {
    try {
        const { name, message } = req.body;
        
    
        if (!name || !message) {
            return res.status(400).json({ 
                error: "Both name and message are required",
                received: req.body
            });
        }

        const sanitizedMessage = {
            name: name.toString().trim().slice(0, 50),
            message: message.toString().trim().slice(0, 500),
            timestamp: new Date().toISOString()
        };

        messages.push(sanitizedMessage);
        cleanMessages();
        
        res.json({
            status: 'Message received',
            message: sanitizedMessage
        });
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});