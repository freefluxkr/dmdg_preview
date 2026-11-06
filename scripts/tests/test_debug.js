const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless',
  '--disable-gpu',
  'file:///c:/DMDG_JOBs/temp_dmdg_live/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      console.log('CHROME_PAGES:', body);
      chrome.kill();
      process.exit(0);
    });
  }).on('error', err => {
    console.error('CONNECT_ERR:', err.message);
    chrome.kill();
    process.exit(1);
  });
}, 2000);

