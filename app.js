const port = 4611;

const express = require('express');
const app = express();
app.use(express.json());

app.get('/list', (req, res) => {
  if (!req.headers['x-api-key']) res.status(401).send();
  else {
    let param = req.params;

    if (param == 0) res.json();
    else if (param === 1) res.json();
    else res.json();
  }
});

app.post('/signin', (req, res) => {
  let data = localStorage.getItem(req.id);
  if (data.pass == req.body.password)
    res.send({
      token: `A152cPikfnjc$129c9Acpie@`,
    });
  else res.status(401).send();
});

app.post('/signup', (req, res) => {
  let { id, password } = req.body;

  let check = localStorage.getItem(id);

  if (check) res.status(400).send('alread exist');
  else
    localStorage.setItem(id, {
      id: id,
      pass: password,
    });
});

app.post('/logout', (req, res) => {
  if (!req.headers['x-api-key']) res.status(401).send();
  else {
    res.send('remove x-api-key');
  }
});

app.listen(port);
