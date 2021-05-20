const express = require('express');
const app = express();

const port = parseInt(process.env.PORT) || 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/v1/image/upload-photo', (req, res) => {
  const body = req.body;
  const name = body.name;
  const key = body.id;
  const url = body.photo;

  const timeInSeconds = Math.floor(Math.random() * 6) + 1;
  const time = timeInSeconds * 1000;

  setTimeout(() => {
    res.status(200).json({
      code: 100,
      message: 'Solicitud exitosa.',
      data: {
        photo: {
          name,
          key,
          url,
        }
      }
    })
  }, time);
});

app.listen(port, () => {
  console.log('Ready localhost on port: ' + port);
});
