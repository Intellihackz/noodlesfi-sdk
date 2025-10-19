import { Noodles } from '../dist/index';

/**
 * Basic usage example demonstrating SDK initialization and simple API call
 */
async function main() {
  // Initialize the Noodles SDK client
  const client = new Noodles({
    apiKey: process.env.NOODLES_API_KEY || 'your-api-key',
    timeout: 30000
  });

  console.log('🍜 Noodles SDK - Basic Usage Example\n');

  try {
    // Fetch OHLCV data for CETUS/SUI trading pair
    console.log('Fetching CETUS/SUI 1-hour candles...');
    const response = await client.ohlcv.getPair({
      coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
      coin_b: '0x2::sui::SUI',
      bucket: 60,  // 1-hour candles
      limit: 5     // Last 5 candles
    });

    if (response.code === 200 && response.data) {
      console.log(`\n✅ Success! Retrieved ${response.data.data.length} candles:\n`);
      
      response.data.data.forEach(([timestamp, open, high, low, close, volumeA, volumeB]) => {
        const date = new Date(timestamp * 1000).toISOString();
        console.log(`📊 ${date}`);
        console.log(`   Open: ${open}, High: ${high}, Low: ${low}, Close: ${close}`);
        console.log(`   CETUS Volume: ${volumeA}, SUI Volume: ${volumeB}\n`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
