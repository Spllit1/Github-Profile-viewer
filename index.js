const express = require('express');
const path = require('path');
const { getInfo } = require('./getInfo.js');

const app = express();

app.use('/api', async (req, res) => {
  const { a } = req.query;
  if (a) {
    const data = await getInfo(a);
    res.json(data);
  } else {
    res.status(400).json({ error: 'Parameter "a" ist erforderlich.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server gestartet auf Port 3000');
});
