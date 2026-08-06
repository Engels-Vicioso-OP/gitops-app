const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const APP_TITLE = process.env.APP_TITLE || 'GitOps Portal';
const APP_ENV = process.env.APP_ENV || 'local-dev';

// Reads key=value pairs from the Vault secret file
function getSecret(filePath, keyName) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim() === keyName) {
          return valueParts.join('=').trim();
        }
      }
    }
  } catch (err) {
    console.error(`Error reading secret from ${filePath}:`, err.message);
  }
  return process.env[keyName] || 'not-configured';
}

const server = http.createServer((req, res) => {
  const apiKey = getSecret('/vault/secrets/web-secret', 'API_KEY');

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: "Hello from Argo GitOps Pipeline with Vault Secret Injection!",
    title: APP_TITLE,
    environment: APP_ENV,
    api_key: apiKey,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});