// Sample Node.js backend logic for a subscription system (Express.js)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Mock database (in-memory)
let users = [];
let tags = {};

app.post('/subscribe', (req, res) => {
    const { email, name, list, tag } = req.body;

    if (!email || !list) {
        return res.status(400).json({ error: 'Email and list are required.' });
    }

    const user = { email, name, list };
    users.push(user);

    // Assign tag
    if (tag) {
        if (!tags[tag]) tags[tag] = [];
        tags[tag].push(email);
    }

    console.log(`[Subscribed] ${email} to ${list} ${tag ? 'with tag ' + tag : ''}`);
    return res.status(200).json({ message: 'Subscribed successfully.' });
});

// Mock endpoint to send a campaign
app.post('/send-campaign', (req, res) => {
    const { list, tag, subject, body } = req.body;

    const targetUsers = users.filter(user =>
        user.list === list && (!tag || tags[tag]?.includes(user.email))
    );

    // Simulate sending emails
    targetUsers.forEach(user => {
        console.log(`Sending campaign to: ${user.email}`);
    });

    return res.status(200).json({ sent: targetUsers.length });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
