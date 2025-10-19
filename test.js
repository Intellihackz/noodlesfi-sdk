const { Noodles } = require('./dist/index');

const client = new Noodles({
  apiKey: 'YOUR_REAL_API_KEY',
});

client.ohlcv.getPair({
  coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
  coin_b: '0x2::sui::SUI',
  bucket: 60,
  limit: 2
}).then(response => {
  console.log('Success!', JSON.stringify(response, null, 2));
}).catch(error => {
  console.error('Error:', error.message);
});