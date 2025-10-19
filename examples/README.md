# Noodles SDK Examples

This directory contains example code snippets demonstrating how to use the Noodles SDK.

## Quick Links

- [Basic Usage](./basic-usage.ts) - Getting started with the SDK
- [OHLCV Data](./ohlcv-examples.ts) - Fetching candlestick data
- [Coin Information](./coin-examples.ts) - Working with coin data
- [Error Handling](./error-handling.ts) - Handling API errors
- [Rate Limiting](./rate-limiting.ts) - Dealing with rate limits

## Running Examples

1. Install dependencies:

```bash
npm install
```

1. Build the SDK:

```bash
npm run build
```

1. Set your API key:

```bash
export NOODLES_API_KEY="your-api-key"
```

1. Run an example:

```bash
node examples/basic-usage.js
```

Or with TypeScript:

```bash
npx ts-node examples/basic-usage.ts
```
