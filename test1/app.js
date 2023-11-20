const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const final = require('./main');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/memberIds', async (req, res) => {
  const memberIds = req.body.memberIds;
  console.log('Received member IDs:', memberIds);

  // Call the final function with the received member IDs
  try {
      // const result = await final(memberIds);
      // res.json({ status: 'success', result: result });
      const result = await final(memberIds);
      // Send result to Flask server
      const flaskResponse = await axios.post('http://localhost:5000/process', { data: result });
      // res.send(flaskResponse.data);
      const responseData = flaskResponse.data;
      console.log("responseData:",responseData);
      // res.render('result', { data:responseData });
      res.json({ responseData });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
  }
});


app.post('/submit-url', async (req, res) => {
  const url = req.body.url;
  console.log("url:",url);
  try {
      const result = await final(url);
      // Send result to Flask server
      const flaskResponse = await axios.post('http://localhost:5000/process', { data: result });
      // res.send(flaskResponse.data);
      const responseData = flaskResponse.data;
      res.render('result', { data:responseData });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
  }
});

function calculateResult(url) {
  // Your logic to calculate the result based on the URL
  return `Calculated Result for ${url}`;
}

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});