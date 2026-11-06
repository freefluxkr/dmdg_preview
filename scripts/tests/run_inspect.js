const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9223',
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  'file:///c:/DMDG_JOBs/temp_dmdg_live/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9223/json', (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      const list = JSON.parse(body);
      const page = list.find(p => p.url.includes('index.html'));
      if (!page) {
        console.log('No page found');
        chrome.kill();
        return;
      }
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `({
                title: document.title,
                canvas: !!document.getElementById('sunsetWaveCanvas'),
                canvasRect: document.getElementById('sunsetWaveCanvas')?.getBoundingClientRect(),
                canvasW: document.getElementById('sunsetWaveCanvas')?.width,
                canvasH: document.getElementById('sunsetWaveCanvas')?.height,
                waveCtx: typeof waveCtx !== 'undefined' && !!waveCtx,
                waveIsPlaying: typeof waveIsPlaying !== 'undefined' ? waveIsPlaying : null,
                bodyChildren: document.body?.children.length
              })`,
              returnByValue: true
            }
          }));
        }, 1500);
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 3) {
          console.log('EVAL_RESULT:', JSON.stringify(data.result, null, 2));
          ws.close();
          chrome.kill();
          process.exit(0);
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('EXCEPTION:', JSON.stringify(data.params.exceptionDetails, null, 2));
        }
      };
    });
  }).on('error', err => {
    console.error('ERR:', err);
    chrome.kill();
  });
}, 2000);

