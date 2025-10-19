import { 
  Noodles, 
  BadRequestError, 
  UnauthorizedError, 
  RateLimitError, 
  InternalServerError,
  NoodlesError 
} from '../dist/index';

/**
 * Error handling examples showing how to handle different types of API errors
 */
async function main() {
  const client = new Noodles({
    apiKey: process.env.NOODLES_API_KEY || 'your-api-key'
  });

  console.log('🍜 Noodles SDK - Error Handling Examples\n');

  // Example 1: Handling specific error types
  console.log('Example 1: Specific Error Handling');
  try {
    const response = await client.ohlcv.getPair({
      coin_a: 'invalid-coin',  // This will cause a BadRequestError
      coin_b: '0x2::sui::SUI',
      bucket: 60
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      console.log('❌ Bad Request:', error.message);
      console.log('   Fix: Check your coin IDs and parameters\n');
    } else if (error instanceof UnauthorizedError) {
      console.log('❌ Unauthorized:', error.message);
      console.log('   Fix: Check your API key\n');
    } else if (error instanceof RateLimitError) {
      console.log('❌ Rate Limit Exceeded:', error.message);
      console.log('   Fix: Slow down your requests\n');
    } else if (error instanceof InternalServerError) {
      console.log('❌ Server Error:', error.message);
      console.log('   Fix: Retry after a delay\n');
    } else {
      console.log('❌ Unexpected Error:', error);
    }
  }

  // Example 2: Retry logic for server errors
  console.log('\nExample 2: Retry Logic for Server Errors');
  
  async function fetchWithRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        const isLastAttempt = attempt === maxRetries - 1;
        
        if (error instanceof InternalServerError && !isLastAttempt) {
          const delay = baseDelay * Math.pow(2, attempt);
          console.log(`   Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded');
  }

  // Example 3: Accessing error details
  console.log('\nExample 3: Error Details');
  try {
    await client.ohlcv.getPair({
      coin_a: '',  // Empty coin_a
      coin_b: '',
      bucket: 60
    });
  } catch (error) {
    if (error instanceof NoodlesError) {
      console.log('Error Code:', error.code);
      console.log('Error Message:', error.message);
      console.log('Error Data:', error.data);
      console.log('Error Name:', error.name);
    }
  }
}

main();
