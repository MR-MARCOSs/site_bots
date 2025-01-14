import axios from 'axios';
import { ApiError } from '../helpers/api-errors';

export const fetchBotResponse = async (userMessage: string): Promise<string> => {
    const response = await axios.get('https://mr-marcoss-goobe.hf.space/goobe/query', {
        params: {
            query: userMessage,
        },
    });
    
    // Verifique se a resposta está no formato correto
    if (response.data && response.data.response) {
        return response.data.response; // Altere conforme o que a API retorna
    } else {
        throw new ApiError('Resposta inválida da API', 400);
    }
};
