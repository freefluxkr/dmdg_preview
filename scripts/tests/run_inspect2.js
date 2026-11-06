const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9224',
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  'file:///c:/DMDG_JOBs/temp_dmdg_live/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9224/json', (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      const list = JSON.parse(body);
      const page = list.find(p => p.url.includes('index.html'));
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `({
                docBodyNull: document.body === null,
                htmlLength: document.documentElement.outerHTML.length,
                hasCanvasId: !!document.getElementById('sunsetWaveCanvas'),
                first200HTML: document.documentElement.outerHTML.slice(0, 300)
              })`,
              returnByValue: true
            }
          }));
        }, 1500);
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 2) {
          console.log('EVAL_DOC:', JSON.stringify(data.result, null, 2));
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 2000);

