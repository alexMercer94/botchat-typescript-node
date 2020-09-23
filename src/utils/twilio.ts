import { Twilio } from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

// Create Twilio Instance
const client = new Twilio(accountSid, authToken);

/**
 * Function to send message
 * @param to User's whatsapp number
 * @param from Twilio's Sandbox number
 * @param body Body
 */
export const sendMessage = (to: string, from: string, body: string) => {
    console.log({ to, from, body });

    return new Promise((resolve, reject) => {
        client.messages
            .create({
                to,
                from,
                body,
            })
            .then((message) => {
                resolve(message.sid);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
