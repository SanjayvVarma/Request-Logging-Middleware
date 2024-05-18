const express = require("express");
const fs = require("fs");

const PORT = 8000;

function loggerMiddleware(req, res, next) {
    const logEntry = `Request received on ${req.url} with ${req.method} method from ${req.ip} at ${new Date().toISOString()}\n`;
    fs.appendFile("requestLoggingMiddleware/requestlog.log", logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
    });
    next();
}

const app = express();

app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.status(200).json({
        message: " product json data"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
