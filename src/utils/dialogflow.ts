const dialogflow = require('dialogflow');
const credentials = require('../../credentials-banbajio.json');

// Create client session with Dialogflow credentials
const sessionClient = new dialogflow.SessionsClient({
    credentials: credentials,
});

// DialogFlow's Project id
const projectId: string = process.env.DIALOGFLOW_PROJECT_ID!;

/**
 * Function to send query to Dialogflow
 * @param query Query for dialogdlow
 * @param number User's Whatsapp number
 */
export const runQuery = (query: string, number: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            // A unique identifier for the given session
            //const sessionId = uuid.v4();
            const sessionId = number;
            // Create a new session

            const sessionPath = sessionClient.sessionPath(projectId, sessionId);

            // The text query request.
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        // The query to send to the dialogflow agent
                        text: query,
                        // The language used by the client (en-US)
                        languageCode: 'en-US',
                    },
                },
            };

            // Send request and log result
            const responses = await sessionClient.detectIntent(request);

            const result = responses[0].queryResult;

            resolve(result);
        } catch (error) {
            console.log(error);

            reject(error);
        }
    });
};
