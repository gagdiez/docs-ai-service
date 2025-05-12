import { Request, Response } from 'express';

import { ChatRequest } from '../interfaces/chat.interface';
import { ChatService } from '../services/chat.service';
import { env } from '../config/env';

const COOKIE = {
  "account_id": env.ACCOUNT_ID,
  "public_key": env.PUBLIC_KEY,
  "signature": env.SIGNATURE,
  "callback_url": env.CALLBACK_URL,
  "message": env.MESSAGE,
  "recipient": env.RECIPIENT,
  "nonce": env.NONCE
};


export class ChatController {
  async chatWithNearAI(req: Request, res: Response): Promise<void> {
    try {
      const chatRequest: ChatRequest = req.body;

      if (!chatRequest.messages || chatRequest.messages.length === 0) {
        res.status(400).json({ error: 'Messages array is required and cannot be empty' });
        return;
      }

      const chatService = new ChatService({ cookie: COOKIE });
      const result = await chatService.chatWithAI(chatRequest.messages, chatRequest.threadId);
      const messageContent = chatService.extractMessageContent(result);
      const threadId = chatService.getThreadId(result);
      res.json({ message: messageContent?.value, threadId });
    } catch (error) {
      console.error('Error in chatWithNearAI:', error);
      res.status(500).json({
        error: 'Error processing chat request',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const chatController = new ChatController();
