import { Request, Response } from 'express';
import { fetchBotResponse } from '../services/botService';

export const getBotResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userMessage } = req.body;

        console.log('Received message from user:', userMessage);  // Log da mensagem recebida

        // Chama o serviço para pegar a resposta do bot
        const response = await fetchBotResponse(userMessage);

        console.log('Response from bot:', response);  // Log da resposta do bot

        res.status(200).json({ response });
    } catch (error) {
        console.error('Error fetching bot response:', error);
        res.status(500).json({ error: 'An error occurred while fetching the bot response.' });
    }
};
