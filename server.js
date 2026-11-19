const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Статика: html, css, js и статьи лежат в public
app.use(express.static(path.join(__dirname, 'public')));

// Заглушка под будущие фичи: приём email подписчиков
app.use(express.json());
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ ok: false, error: 'email required' });
  const fs = require('fs');
  const file = path.join(__dirname, 'subscribers.txt');
  fs.appendFileSync(file, email + '\n');
  res.json({ ok: true, message: 'Спасибо! Вы в списке.' });
});

app.listen(PORT, () => {
  console.log(`Сайт запущен: http://localhost:${PORT}`);
});
