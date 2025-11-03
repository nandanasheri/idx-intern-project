const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.get('/api/search', async (req, res) => {
  try {
    const baseUrl = 'https://nandana.califorsale.org/search.php';
    const params = new URLSearchParams(req.query);
    const queryUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Proxying request to:', queryUrl);
    
    const response = await fetch(queryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const data = await response.json();
    console.log('Data received:', data);
    
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
