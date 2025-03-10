import "dotenv/config"
import express from 'express';
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.get('/', (req, res) => {
    return res.send('hi every one')
})

// // * Routes file
app.use(routes);

app.listen(PORT, () => console.log("started ..."))