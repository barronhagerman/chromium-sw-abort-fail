const express = require('express');

const app = express();
const port = 3000;
const root = 'dist';

app.get('/', (req, res) => res.sendFile('index.html', {root}));

app.get('/delayedApiResponse', (req, res) => {
  setTimeout(() => {
    res.send();
  }, 5000)
});

app.get(/^(.+)$/, (req, res) => res.sendFile(req.params[0], {root}));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
