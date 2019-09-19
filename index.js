const express = require('express');

const app = express();
const port = 3000;
const root = 'dist';

const cookieName = 'CookieCreatedAfterAbort';

app.get('/delayedApiResponse', (req, res) => {
  setTimeout(() => {
    res.header('Set-Cookie', `${cookieName}=blahblahblah;Path=/;HTTPOnly`);
    res.send();
  }, 5000);
});

app.get('/logout', (req, res) => {
  res.header('Set-Cookie', `${cookieName}=;Max-Age=0;Expires=Thu, 01 Jan 1970 00:00:00 GMT;Path=/;HTTPOnly`);
  res.send();
});

app.get('/', (req, res) => {
  res.header('Set-Cookie', `${cookieName}=blahblahblah;Path=/;HTTPOnly`);
  res.sendFile('index.html', {root});
});
app.get(/^(.+)$/, (req, res) => res.sendFile(req.params[0], {root}));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
