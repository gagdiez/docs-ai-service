import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';

const router = Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Chat with Near AI
 *     description: Send messages to Near AI and get responses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *               options:
 *                 type: object
 *                 properties:
 *                   temperature:
 *                     type: number
 *                   maxTokens:
 *                     type: number
 *                   stream:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Successful response from the AI
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Server error
 */
router.post('/chat', chatController.chatWithNearAI);

export const chatRoutes = router;
