const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const list = JSON.parse(body);
    const page = list.find(p => p.url.includes('index.html'));
    if (!page) {
      console.log('No page found');
      return;
    }
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      
      // Reload page and wait
      ws.send(JSON.stringify({ id: 3, method: 'Page.reload' }));
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.method === 'Page.loadEventFired') {
        console.log('Page fully loaded!');
        ws.send(JSON.stringify({
          id: 4,
          method: 'Runtime.evaluate',
          params: {
            expression: `({
              readyState: document.readyState,
              canvas: document.getElementById('sunsetWaveCanvas') ? {
                w: document.getElementById('sunsetWaveCanvas').width,
                h: document.getElementById('sunsetWaveCanvas').height,
                clientW: document.getElementById('sunsetWaveCanvas').clientWidth,
                clientH: document.getElementById('sunsetWaveCanvas').clientHeight,
              } : null,
              waveCtx: typeof waveCtx !== 'undefined' && !!waveCtx,
              waveIsPlaying: typeof waveIsPlaying !== 'undefined' ? waveIsPlaying : null,
              errors: window.__errors || []
            })`,
            returnByValue: true
          }
        }));
      }
      if (data.id === 4) {
        console.log('FINAL_RESULT:', JSON.stringify(data.result, null, 2));
        ws.close();
        process.exit(0);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', JSON.stringify(data.params.exceptionDetails, null, 2));
      }
    };
  });
});

