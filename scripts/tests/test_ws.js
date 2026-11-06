const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const list = JSON.parse(body);
    const page = list.find(p => p.url.includes('index.html'));
    if (!page) {
      console.log('No index.html page found');
      return;
    }
    console.log('WS URL:', page.webSocketDebuggerUrl);

    // Node 22+ has built-in WebSocket!
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      console.log('WebSocket connected!');
      // Enable Runtime and Log
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      
      // Evaluate canvas state
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 3,
          method: 'Runtime.evaluate',
          params: {
            expression: `({
              canvasExists: !!document.getElementById('sunsetWaveCanvas'),
              canvasWidth: document.getElementById('sunsetWaveCanvas')?.width,
              canvasHeight: document.getElementById('sunsetWaveCanvas')?.height,
              canvasClientWidth: document.getElementById('sunsetWaveCanvas')?.clientWidth,
              canvasClientHeight: document.getElementById('sunsetWaveCanvas')?.clientHeight,
              waveCtxExists: typeof waveCtx !== 'undefined' && !!waveCtx,
              waveIsPlaying: typeof waveIsPlaying !== 'undefined' ? waveIsPlaying : 'undefined',
              wavePhase: typeof wavePhase !== 'undefined' ? wavePhase : 'undefined',
              waveAnimFrameId: typeof waveAnimFrameId !== 'undefined' ? waveAnimFrameId : 'undefined'
            })`,
            returnByValue: true
          }
        }));
      }, 500);
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === 3) {
        console.log('EVAL_RESULT:', JSON.stringify(data.result, null, 2));
        ws.close();
        process.exit(0);
      }
      if (data.method === 'Runtime.consoleAPICalled' || data.method === 'Log.entryAdded') {
        console.log('BROWSER_LOG:', JSON.stringify(data));
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('BROWSER_EXCEPTION:', JSON.stringify(data.params.exceptionDetails, null, 2));
      }
    };
  });
});

