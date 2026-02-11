import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import 'dotenv/config';

// Configure the provider for Venture AI (api.useventure.com)
const venture = createOpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: 'https://api.useventure.com/v1',
});

async function main() {
    console.log('--- Iniciando Stream (gateway.ts) ---');

    try {
        const result = streamText({
            model: venture('openai/gpt-4.1'),
            prompt: 'Invent a new holiday and describe its traditions.',
        });

        for await (const textPart of result.textStream) {
            process.stdout.write(textPart);
        }

        console.log('\n\n--- Metadados ---');
        console.log('Token usage:', await result.usage);
        console.log('Finish reason:', await result.finishReason);
    } catch (error: any) {
        console.error('\nErro ao executar streamText:', error.message);
    }
}

main().catch(console.error);
