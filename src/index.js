const express = require('express');
const cors = require('cors');
const { config } = require('./config');
const BooksRouter = require('./routes/books.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

BooksRouter(app);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
});