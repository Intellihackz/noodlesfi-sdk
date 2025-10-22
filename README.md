# Noodles SDK

TypeScript/JavaScript SDK for the [Noodles API](https://noodles.fi) - Access cryptocurrency market data, OHLCV charts, coin information, liquidity pools, and portfolio tracking.

[![npm version](https://img.shields.io/npm/v/noodlesfi-sdk.svg)](https://www.npmjs.com/package/noodlesfi-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/IntelliHackz/noodlesfi-sdk)
[![Made by Zephyr](https://img.shields.io/badge/made%20by-Zephyr-ff69b4.svg)](https://github.com/IntelliHackz)
[![x Follow](https://img.shields.io/twitter/follow/zephyrdev_?style=social)](https://x.com/zephyrdev_)

## Features

✅ **Full TypeScript Support** - Complete type definitions with IntelliSense  
✅ **OHLCV Data** - Historical candlestick charts for coins and trading pairs  
✅ **Coin Information** - Detailed coin data, prices, and market metrics  
✅ **Pool Data** - Liquidity pool information and analytics  
✅ **Portfolio Tracking** - Track and analyze crypto portfolios  
✅ **Error Handling** - Custom typed errors for better debugging  
✅ **Promise-based API** - Modern async/await support

## Installation

```bash
npm install noodlesfi-sdk
```

```bash
yarn add noodlesfi-sdk
```

```bash
pnpm add noodlesfi-sdk
```

## Quick Start

```typescript
import { Noodles } from 'noodlesfi-sdk';

// Initialize the client
const client = new Noodles({
  apiKey: 'your-api-key', // Get your API key from https://noodles.fi
  timeout: 30000 // Optional: request timeout in milliseconds (default: 30000)
});

// Fetch OHLCV data for a trading pair
const ohlcvData = await client.ohlcv.getPair({
  coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
  coin_b: '0x2::sui::SUI',
  bucket: 60,  // 1-hour candles
  limit: 100   // Last 100 candles
});

console.log(ohlcvData.data);
```

## Usage Examples

### OHLCV (Candlestick) Data

#### Get OHLCV data for a single coin

```typescript
const response = await client.ohlcv.get({
  coin_id: '0x2::sui::SUI',
  bucket: 240,  // 4-hour candles
  limit: 24,    // Last 24 candles (4 days)
  from: 1697760000, // Optional: Unix timestamp (seconds)
  to: 1697846400    // Optional: Unix timestamp (seconds)
});

// Process the data
response.data?.data.forEach(([timestamp, open, high, low, close, volume]) => {
  const date = new Date(timestamp * 1000);
  console.log(`${date}: Open: $${open}, High: $${high}, Low: $${low}, Close: $${close}, Volume: ${volume}`);
});
```

#### Get OHLCV data for a trading pair

```typescript
const response = await client.ohlcv.getPair({
  coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
  coin_b: '0x2::sui::SUI',
  bucket: 60,   // Time interval in minutes (1, 5, 15, 60, 240, 1440, 10080, 43200)
  limit: 100
});

// Pair data includes volume for both coins
response.data?.data.forEach(([timestamp, open, high, low, close, volumeA, volumeB]) => {
  console.log(`CETUS/SUI at ${new Date(timestamp * 1000)}`);
  console.log(`  Price: $${close}`);
  console.log(`  CETUS Volume: ${volumeA}, SUI Volume: ${volumeB}`);
});
```

**Available time buckets:**

- `1` - 1 minute
- `5` - 5 minutes
- `15` - 15 minutes
- `60` - 1 hour
- `240` - 4 hours
- `1440` - 1 day
- `10080` - 1 week
- `43200` - 1 month (30 days)

### Coin Information

#### Get detailed coin information

```typescript
const response = await client.coin.getDetail({
  coin_id: '0x2::sui::SUI'
});

if (response.code === 200 && response.data) {
  const { coin, price_change, social_media, tags, security } = response.data;
  
  console.log(`${coin.name} (${coin.symbol})`);
  console.log(`Price: $${price_change.price}`);
  console.log(`24h Change: ${price_change.price_change_1d}%`);
  console.log(`Market Cap: $${coin.market_cap}`);
  console.log(`Verified: ${coin.verified}`);
  
  if (social_media) {
    console.log(`Website: ${social_media.website}`);
    console.log(`x: ${social_media.x}`);
  }
}
```

#### Get trending coins

```typescript
const response = await client.coin.getTrending({
  score_period: '24h', // '30m' | '1h' | '4h' | '6h' | '24h'
  pagination: {
    limit: 50,
    offset: 0
  }
});

response.data?.forEach(coin => {
  console.log(`${coin.name} (${coin.symbol})`);
  console.log(`  Rank: ${coin.rank}`);
  console.log(`  Price: $${coin.price}`);
  console.log(`  24h Change: ${coin.price_change_1d}%`);
  console.log(`  Volume 24h: $${coin.volume_24h}`);
});
```

#### Get top coins by market cap

```typescript
const response = await client.coin.getTop({
  pagination: { limit: 100 }
});
```

#### Get newly listed coins

```typescript
const response = await client.coin.getNew({
  pagination: { limit: 50 }
});
```

#### Get coin price

```typescript
// Single coin price
const response = await client.coin.getPrice({
  coin_id: '0x2::sui::SUI'
});

console.log(`Price: $${response.data?.price}`);
console.log(`24h Change: ${response.data?.price_change_24h}%`);
```

#### Get multiple coin prices

```typescript
// Using POST (array) - preferred for many IDs
const responsePost = await client.coin.getPriceMulti({
  coin_ids: [
    '0x2::sui::SUI',
    '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'
  ]
}, 'sui', 'POST');

// Using GET (comma-separated) - small number of IDs
const responseGet = await client.coin.getPriceMulti({ coin_ids: '0x2::sui::SUI,0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN' }, 'sui', 'GET');

// Choose the response you need (responsePost or responseGet)
const response = responsePost; // or responseGet

// Access prices by coin ID
for (const [coinId, priceData] of Object.entries(response.data || {})) {
  if (priceData) {
    console.log(`${coinId}: $${priceData.price}`);
  }
}
```

#### Get coin price and volume

```typescript
const response = await client.coin.getPriceVolume({
  coin_id: '0x2::sui::SUI'
});

console.log(`Price: $${response.data?.price}`);
console.log(`24h Volume: $${response.data?.volume_24h}`);
console.log(`24h Price Change: ${response.data?.price_change_24h}%`);
console.log(`24h Volume Change: ${response.data?.volume_change_24h}%`);
```

## Error Handling

The SDK provides typed error classes for better error handling:

```typescript
import { 
  NoodlesError, 
  BadRequestError, 
  UnauthorizedError, 
  RateLimitError, 
  InternalServerError 
} from 'noodlesfi-sdk';

try {
  const data = await client.ohlcv.getPair(params);
  console.log(data);
} catch (error) {
  if (error instanceof BadRequestError) {
    console.error('Invalid request parameters:', error.message);
  } else if (error instanceof UnauthorizedError) {
    console.error('Authentication failed. Check your API key.');
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Slow down requests.');
    // Implement exponential backoff
  } else if (error instanceof InternalServerError) {
    console.error('Server error. Retry after a delay.');
  } else if (error instanceof NoodlesError) {
    console.error(`API Error ${error.code}: ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Error Types

| Error Class | HTTP Status | Description |
|------------|-------------|-------------|
| `BadRequestError` | 400 | Invalid parameters or malformed request |
| `UnauthorizedError` | 401 | Invalid or missing API key |
| `RateLimitError` | 429 | Too many requests - implement rate limiting |
| `InternalServerError` | 500 | Server-side error - safe to retry |
| `NoodlesError` | Any | Base error class for all SDK errors |

## API Reference

### Client Initialization

```typescript
const client = new Noodles(config: NoodlesConfig)
```

**NoodlesConfig:**

- `apiKey` (string, required) - Your Noodles API key
- `timeout` (number, optional) - Request timeout in milliseconds (default: 30000)

### Resources

#### `client.ohlcv`

OHLCV candlestick data endpoints.

- `get(params: OhlcvParams)` - Get OHLCV data for a single coin
- `getPair(params: OhlcvPairParams)` - Get OHLCV data for a trading pair

#### `client.coin`

Coin information and pricing endpoints.

- `getDetail(params: CoinDetailParams)` - Get detailed coin information
- `getTrending(params: CoinTrendingParams)` - Get trending coins
- `getTop(params: CoinTopParams)` - Get top coins by market cap
- `getNew(params: CoinNewParams)` - Get newly listed coins
- `getPrice(params: CoinPriceParams)` - Get single coin price
- `getPriceMulti(params: CoinPriceMultiParamsGet | CoinPriceMultiParamsPost, chain?: string, method?: 'GET' | 'POST')` - Get multiple prices (GET or POST)
- `getPriceVolume(params: CoinPriceVolumeParams)` - Get price and volume data

#### `client.pool`

Liquidity pool data endpoints.

#### `client.portfolio`

Portfolio tracking endpoints.

## TypeScript Support

The SDK is written in TypeScript and provides complete type definitions:

```typescript
import { 
  Noodles,
  NoodlesConfig,
  ApiResponse,
  OhlcvPairParams,
  OhlcvPairResponse,
  OhlcvDataPoint,
  CoinDetailData,
  TrendingCoin,
  // ... and many more
} from 'noodlesfi-sdk';
```

All API responses are fully typed, giving you autocomplete and type checking in your IDE.

## Rate Limiting

The Noodles API has rate limits. When you exceed them, the SDK will throw a `RateLimitError`. Implement exponential backoff:

```typescript
async function fetchWithRetry(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RateLimitError && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Usage
const data = await fetchWithRetry(() => 
  client.ohlcv.getPair({ coin_a: '...', coin_b: '...', bucket: 60 })
);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Zephyr** ([@zephyrdev_](https://x.com/zephyrdev_)) 🚀

- 🐙 GitHub: [@IntelliHackz](https://github.com/IntelliHackz)
- 🐦 x: [@zephyrdev_](https://x.com/zephyrdev_)
- 💼 Building tools for the Web3 ecosystem

> Built with ❤️ for the Web3 community

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## Official Noodles API Support

- 📧 Email: <support@noodles.fi>
- 🐦 x: [@NoodlesFi](https://x.com/NoodlesFi)
- 📚 Documentation: [https://docs.noodles.fi](https://docs.noodles.fi)
- 🌐 Website: [https://noodles.fi](https://noodles.fi)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**If this SDK helped you, give it a ⭐️ on [GitHub](https://github.com/IntelliHackz/noodlesfi-sdk)!**

Made with 🍜 and ❤️ for the Web3 community
