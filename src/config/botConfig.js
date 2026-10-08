// El sufijo "?raw" es una función de Vite: importa el archivo como un string de texto
import systemPrompt from './systemPrompt.md?raw';

// Vite guarda las variables VITE_ del .env acá
const env = import.meta.env;

export const botConfig = {
    // Lo que viene del .env (con un valor por defecto si falta, usando ||)
    baseUrl: '/api',   // el mismo en local y en Vercel
    apiKey: '',        // la key ya no vive en el front
    model: env.VITE_LLM_MODEL || 'default',

    // OJO: todo lo del .env llega como STRING, por eso convertimos
    temperature: parseFloat(env.VITE_LLM_TEMPERATURE), // "0.7" -> 0.7
    streaming: env.VITE_LLM_STREAMING !== 'false',      // "true" -> true

    // Lo que viene del archivo de texto
    systemPrompt: systemPrompt.trim(),

    // Esto es de la interfaz, no es secreto, así que queda en el código
    defaultText: '¡Hola! Soy tu asistente IA. ¿Qué querés saber sobre este portfolio?',
    modelUrl: '/models/robot.glb',
    corner: 'bottom-right',
};
