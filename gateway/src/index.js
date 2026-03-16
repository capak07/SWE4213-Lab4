const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'http://api:3000';

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute window
  max: 100,             // max requests per window per IP
  message: { error: 'Too many requests, please try again later.' },
});

app.use(limiter);

app.use('/', createProxyMiddleware({ target: API_URL, changeOrigin: true }));

app.listen(PORT, () => console.log(`gateway listening on port ${PORT}, proxying to ${API_URL}`));
