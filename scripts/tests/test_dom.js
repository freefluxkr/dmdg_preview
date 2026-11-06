const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const list = JSON.parse(body);
    const page = list.find(p => p.url.includes('index.html'));
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `({
            title: document.title,
            bodyLength: document.body.innerHTML.length,
            hasCanvas: !!document.querySelector('canvas'),
            allCanvases: Array.from(document.querySelectorAll('canvas')).map(c => c.id),
            first100Chars: document.body.innerHTML.slice(0, 300)
          })`,
          returnByValue: true
        }
      }));
    };
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === 1) {
        console.log('DOM_INFO:', JSON.stringify(data.result, null, 2));
        ws.close();
        process.exit(0);
      }
    };
  });
});

