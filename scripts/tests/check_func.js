const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9226',
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  'file:///c:/DMDG_JOBs/temp_dmdg_live/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9226/json', (res) => {
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
              expression: `(() => {
                let callErr = null;
                try {
                  if (typeof initSunsetWaveEngine === 'function') {
                    initSunsetWaveEngine();
                  } else {
                    callErr = 'initSunsetWaveEngine is not a function: ' + typeof initSunsetWaveEngine;
                  }
                } catch(e) {
                  callErr = e.stack;
                }
                const cv = document.getElementById('sunsetWaveCanvas');
                return {
                  callErr,
                  hasFunc: typeof initSunsetWaveEngine,
                  cv: !!cv
                };
              })()`,
              returnByValue: true
            }
          }));
        }, 1500);
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 2) {
          console.log('FUNC_CHECK:', JSON.stringify(data.result, null, 2));
          ws.close();
          chrome.kill();
          process.exit(0);
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('EXCEPTION:', JSON.stringify(data.params.exceptionDetails, null, 2));
        }
      };
    });
  });
}, 2000);

