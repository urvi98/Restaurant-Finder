const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import Axios

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// API endpoint to fetch restaurant data based on latitude and longitude

app.get("/api/restaurants/:latitude/:longitude", async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const apiKey = "AIzaSyDfCLQ-sdDBIc18sDDzwCY5uambUULEU0Y";
    const apiUrl = ` https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-${latitude},${longitude}&radius=1500&type=restaurant&key=${apiKey}`;

    const restaurants = axios.get(apiUrl);

    return res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurant data:", error.message);
    res.status(500).json({ error: "Error fetching restaurant data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
