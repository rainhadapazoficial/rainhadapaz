import 'dotenv/config';

async function checkModels() {
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    const baseURLs = [
        'https://api.visioncraft.ai/v1',
        'https://api.vck.ai/v1',
        'https://api.useventure.com/v1',
        'https://v1.api.vck.ai'
    ];

    for (const baseURL of baseURLs) {
        console.log('--- Checking:', baseURL, '---');
        try {
            const response = await fetch(`${baseURL}/models`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            console.log('Status:', response.status, response.statusText);
            const body = await response.text();
            if (response.ok) {
                console.log('Success! Models:', body.slice(0, 200));
                break;
            } else {
                console.log('Error Body:', body.slice(0, 100));
            }
        } catch (error: any) {
            console.log('Fetch Error:', error.message);
        }
    }
}

checkModels();
