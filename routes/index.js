const express = require('express');
const router  = express.Router();
const db      = require('../db');

// Serve the landing page
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Handle signup form submission
router.post('/signup', async (req, res) => {
  const { name, email, company } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
    const { data, error } = await db
      .from('signups')
      .insert([{ name, email, company }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'That email is already signed up.' });
      }
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    const botName      = process.env.TELEGRAM_BOT_NAME || 'SalesMemoryBot';
    const telegramLink = `https://t.me/${botName}?start=${data.id}`;

    res.status(201).json({ telegram_link: telegramLink, name: data.name });

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
