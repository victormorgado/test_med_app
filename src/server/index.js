const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();


app.set('view engine','ejs')
app.use(express.static('public'))

const PORT = process.env.PORT || 8181;

const corsOptions = {
  origin: 'https://victormorgad-3000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai',
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

// Middleware
app.use(express.json());
//app.use(cors());
app.use(cors(corsOptions));

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});



  // Start the server
app.listen(PORT, () => {
console.log(`Server is running on port http://localhost:${PORT}`);
});
