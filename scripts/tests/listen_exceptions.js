const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9228',
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  'file:///c:/DMDG_JOBs/temp_dmdg_live/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9228/json', (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      const list = JSON.parse(body);
      const page = list.find(p => p.url.includes('index.html'));
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('PAGE_EXCEPTION:', JSON.stringify(data.params.exceptionDetails, null, 2));
        }
        if (data.method === 'Runtime.consoleAPICalled') {
          console.log('CONSOLE_LOG:', data.params.type, data.params.args.map(a => a.value || a.description));
        }
      };

      setTimeout(() => {
        ws.close();
        chrome.kill();
        process.exit(0);
      }, 4000);
    });
  });
}, 2000);

