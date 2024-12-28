const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(
  "/event",
  createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true })
);
app.use(
  "/guest",
  createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true })
);
app.use(
  "/vendor",
  createProxyMiddleware({ target: "http://localhost:4003", changeOrigin: true })
);
app.use(
  "/budget",
  createProxyMiddleware({ target: "http://localhost:4004", changeOrigin: true })
);
app.use(
  "/task",
  createProxyMiddleware({ target: "http://localhost:4005", changeOrigin: true })
);
app.use(
  "/notification",
  createProxyMiddleware({ target: "http://localhost:4006", changeOrigin: true })
);

app.listen(3000, () => console.log("API Gateway listening on port 3000"));
