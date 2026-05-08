const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const HTML_FILE = path.join(ROOT, 'School.html');
const DATA_FILE = path.join(ROOT, 'submissions.json');

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

async function readJsonBody(req) {
  let body = '';
  for await (const chunk of req) body += chunk;
  return JSON.parse(body || '{}');
}

async function saveSubmission(data) {
  const submission = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: String(data.email || '').trim(),
    subject: String(data.subject || '').trim(),
    message: String(data.message || '').trim()
  };

  if (!submission.name || !submission.email || !submission.message) {
    throw new Error('Name, email, and message are required.');
  }

  let submissions = [];
  try {
    submissions = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  submissions.push(submission);
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
  return submission;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/School.html')) {
      const html = await fs.readFile(HTML_FILE);
      send(res, 200, html, 'text/html; charset=utf-8');
      return;
    }

    if (req.method === 'POST' && req.url === '/api/contact') {
      const data = await readJsonBody(req);
      const submission = await saveSubmission(data);
      send(res, 201, JSON.stringify({ ok: true, submission }));
      return;
    }

    if (req.method === 'GET' && req.url === '/api/submissions') {
      let submissions = [];
      try {
        submissions = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
      }
      send(res, 200, JSON.stringify({ ok: true, submissions }));
      return;
    }

    send(res, 404, JSON.stringify({ ok: false, error: 'Not found' }));
  } catch (err) {
    send(res, 500, JSON.stringify({ ok: false, error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`School site running at http://127.0.0.1:${PORT}/School.html`);
  console.log(`Submissions will be saved in ${DATA_FILE}`);
});
