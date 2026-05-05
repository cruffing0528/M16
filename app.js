import express from 'express';
import 'dotenv/config';
import routes from './routes/routes.js';
import connectDB from './db/connect.js';
import bodyParser from 'body-parser';

const app = express()

app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Loads index.html from the public folder when the root URL is accessed
app.use('/', routes)

const PORT = process.env.PORT || 5000

const init = async () => {
    try {
        await connectDB(process.env.DB);
        console.log("✅ Connected to MongoDB database");
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
    }
    catch (err) {
        console.error("❌ Connection error:", err.message);
    }
}

init();