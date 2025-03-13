import { input } from '@inquirer/prompts';
import { ChatService } from './src/services/chat.service';
import { env } from './src/config/env';

const COOKIE = {
    "account_id": env.ACCOUNT_ID,
    "public_key": env.PUBLIC_KEY,
    "signature": env.SIGNATURE,
    "callback_url": env.CALLBACK_URL,
    "message": env.MESSAGE,
    "recipient": env.RECIPIENT,
    "nonce": env.NONCE
};

const chatService = new ChatService({ cookie: COOKIE });

async function main(threadId?: string) {
  try {
    const userMessage = await input({ message: 'Write your message:' });
    const result = await chatService.chatWithAI(userMessage, threadId);
    

    const messageContent = chatService.extractMessageContent(result);
    if (messageContent) {
      console.log("\nAI Response:");
      console.log(messageContent);
      
      const currentThreadId = chatService.getThreadId(result);
      main(currentThreadId);

    } else {
      console.log("No response from AI. Starting new conversation.");
      main();
    }
  } catch (error) {
    console.error("Main execution failed:", error);
    process.exit(1);
  }
}

console.log("Welcome to NEAR AI Chat! Type your message below.");
main();
