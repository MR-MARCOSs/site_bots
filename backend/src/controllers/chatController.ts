import { Request, Response } from 'express';
import { fetchBotResponse } from '../services/botService';
import { messageRepository } from '../repositories/messageRepository';
import { BadRequestError } from '../helpers/api-errors';

export class ChatController {
    async getBotResponse(req: Request, res: Response): Promise<void> {
        const { userMessage, chatId } = req.body;
        if (!chatId || !userMessage) {
            throw new BadRequestError('chatId and userMessage are required.')
        }
        // 2. Obtém a resposta do bot
        const botResponse = await fetchBotResponse(userMessage);
        console.log('Bot response:', botResponse);

        // 3. Salva a resposta do bot
        const userMessageEntity = messageRepository.create({
            chat: { id: chatId }, // Relaciona ao chat existente
            sender: 'user',
            content: userMessage,
        });
        await messageRepository.save(userMessageEntity);
        console.log('Saved user message:', userMessageEntity);

        const botMessageEntity = messageRepository.create({
            chat: { id: chatId }, // Relaciona ao mesmo chat
            sender: 'bot',
            content: botResponse,
        });
        await messageRepository.save(botMessageEntity);

        console.log('Saved bot message:', botMessageEntity);

        
        res.status(200).json({ response: botResponse });
}

async list(req: Request, res: Response) { 
    const { chatId } = req.query;  // Supõe-se que chatId e sender sejam passados como query params

    if (!chatId) {
        throw new BadRequestError('chatId é necessário')
    }

    // Verificando se chatId é um número válido
    const parsedChatId = Number(chatId);
    if (isNaN(parsedChatId)) {
        throw new BadRequestError('chatId deve ser um número válido')
    }
    const messages = await messageRepository.find({
        where: {
            chat: { id: parsedChatId },  // Filtra pelo chatId                
        },
        order: {
            sentAt: 'ASC'  // Ordena as mensagens por data de envio (opcional)
        }
    });

    // Caso não encontre mensagens para o chatId, retorna uma resposta apropriada
    if (messages.length === 0) {
        throw new BadRequestError('Nenhuma mensagem encontrada para o chatId fornecido')
    }

    // Retorna as mensagens encontradas
    res.json(messages);
}

}
