const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/yahoo', async (req, res) => {
    const { symbol, interval, range } = req.query;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval || '5m'}&range=${range || '5d'}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));