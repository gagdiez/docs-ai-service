import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || '3000',
  DOCS_GPT_LATEST: process.env.DOCS_GPT_LATEST || 'docs-gpt-latest',
  ACCOUNT_ID: process.env.ACCOUNT_ID || '',
  PUBLIC_KEY: process.env.PUBLIC_KEY || '',
  SIGNATURE: process.env.SIGNATURE || '',
  CALLBACK_URL: process.env.CALLBACK_URL || '',
  MESSAGE: process.env.MESSAGE || '',
  RECIPIENT: process.env.RECIPIENT || '',
  NONCE: process.env.NONCE || ''
};
