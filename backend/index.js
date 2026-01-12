const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const ImageValidationAgent = require('./agents/ImageValidationAgent');

const app = express();
const PORT = process.env.PORT || 8080 , '0.0.0.0';

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/api/image/validate', upload.single('image'), async (req, res) => {
  const agent = new ImageValidationAgent();
  const result = await agent.validateImage(req.file.path);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
