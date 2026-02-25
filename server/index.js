import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

app.use(cors());
app.use(express.json());

console.log('Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('API Key Found:', !!process.env.GEOAPIFY_API_KEY && process.env.GEOAPIFY_API_KEY !== 'your_geoapify_key_here');
console.log('API Key Length:', process.env.GEOAPIFY_API_KEY?.length);

app.get('/api/hospitals', async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const cacheKey = `hospitals:${lat}:${lng}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('Returning cached hospital data');
        return res.json(cachedData);
    }

    try {
        const apiKey = process.env.GEOAPIFY_API_KEY;
        if (!apiKey || apiKey === 'your_geoapify_key_here') {
            throw new Error('Valid Geoapify API key is missing');
        }

        const radius = 5000; // 5km radius
        const response = await axios.get('https://api.geoapify.com/v2/places', {
            params: {
                categories: 'healthcare.hospital',
                filter: `circle:${lng},${lat},${radius}`,
                limit: 20,
                apiKey: apiKey
            }
        });

        const hospitals = response.data.features.map(feature => ({
            id: feature.properties.place_id,
            name: feature.properties.name || 'Unnamed Hospital',
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
            address: feature.properties.address_line2 || feature.properties.formatted,
            category: 'Hospital',
            bedCapacity: Math.floor(Math.random() * 200) + 50,
            icuAvailability: Math.floor(Math.random() * 20) + 5,
            performanceScore: (Math.random() * 2 + 7).toFixed(1) // Mock HHI score 7.0 - 9.0
        }));

        cache.set(cacheKey, hospitals);
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error.message);
        res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
