const http = require('http');

function sendCdp() {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const pages = JSON.parse(data);
      const page = pages.find(p => p.url.includes('index.html'));
      console.log('Page found:', page ? page.id : 'NONE');
    });
  });
}
sendCdp();

