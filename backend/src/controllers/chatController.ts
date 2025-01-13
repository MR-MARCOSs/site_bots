import { Request, Response } from 'express';
import { fetchBotResponse } from '../services/botService';
import { getBotResRepository } from '../repositories/getBotResRepository';
import { messageRepository } from '../repositories/messageRepository';


export class ChatController {
    async getBotResponse(req: Request, res: Response): Promise<void> {
    try {
        const { userMessage, chatId } = req.body;

        if (!chatId || !userMessage) {
            res.status(400).json({ error: 'chatId and userMessage are required.' });
            return
        }

        // 2. Obtém a resposta do bot
        const botResponse = await fetchBotResponse(userMessage);

        console.log('Bot response:', botResponse);

        // 3. Salva a resposta do bot
        const userMessageEntity = getBotResRepository.create({
            chat: { id: chatId }, // Relaciona ao chat existente
            sender: 'user',
            content: userMessage,
        });
        await getBotResRepository.save(userMessageEntity);
        console.log('Saved user message:', userMessageEntity);

        const botMessageEntity = getBotResRepository.create({
            chat: { id: chatId }, // Relaciona ao mesmo chat
            sender: 'bot',
            content: botResponse,
        });
        await getBotResRepository.save(botMessageEntity);

        console.log('Saved bot message:', botMessageEntity);

        
        res.status(200).json({ response: botResponse });
    } catch (error) {
        console.error('Error processing bot response:', error);
        res.status(500).json({ error: 'An error occurred while processing the bot response.' });
    }
}

async list(req: Request, res: Response) { 
    try {
        const { chatId } = req.query;  // Supõe-se que chatId e sender sejam passados como query params

        // Realizando a busca no repositório
        const messages = await messageRepository.find({
            where: {
                chat: { id: Number(chatId) },    // Filtra pelo chatId                
            },
            order: {
                sentAt: 'ASC'  // Pode-se ordenar as mensagens por data de envio (opcional)
            }
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar mensagens' });
    }
}

}
