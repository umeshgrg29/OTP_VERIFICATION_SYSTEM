const cors = require('cors');
const express = require('express')
const app = express();

const allowedOrigins = ['https://super-duper-meme-954gr4vgjv5cp5gr-5173.app.github.dev'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.get('/send-otp',  (req, res, next) => {
        res.send("Hello send otp");
    })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});