import axios from 'axios';

export const fetchBotResponse = async (userMessage: string): Promise<string> => {
    try {
        const response = await axios.get('https://mr-marcoss-goobe.hf.space/goobe/query', {
            params: {
                query: userMessage,
            },
        });
        
        // Verifique se a resposta está no formato correto
        if (response.data && response.data.response) {
            return response.data.response; // Altere conforme o que a API retorna
        } else {
            throw new Error('Resposta inválida da API');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch response from bot API');
    }
};
