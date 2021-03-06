import { Controller, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { runQuery } from '../utils/dialogflow';
import { sendMessage } from '../utils/twilio';

@Controller('api/bot')
export class BotController {
    /**
     * Function to send a message by POST
     * Twilio uses this method when it receives a message from Whatsapp
     * @param request
     * @param response
     */
    @Post()
    private postMessage(request: Request, response: Response) {
        // Here we get the message body, the number to which we're sending the message, and the number sending the message.
        const { Body, To, From } = request.body;
        console.log('BotCTRL post message');

        console.log({ Body, To, From });

        // Here sent the received message to Dialogflow so that it can be identified against an Intent.
        runQuery(Body, From)
            .then((result: any) => {
                // console.log('Dialogflow response', result.fulfillmentText);

                result.fulfillmentMessages
                    .reduce(function (sequence: Promise<any>, value: any) {
                        return sequence
                            .then(function () {
                                return sendMessage(From, To, value.text.text[0]);
                            })
                            .then((res: any) => {
                                console.log('Twilio Response:', res);
                            })
                            .catch((error: any) => {
                                console.error('error is ', error);
                                Logger.Err(error);
                            });
                    }, Promise.resolve())
                    .then(() => {
                        console.log('Completed');
                    });

                // It send the fulfillment text received back to our user via Twilio
                /* sendMessage(From, To, result.fulfillmentText)
                    .then((res) => {
                        // console.log(res);
                        console.log('Twilio Response:', res);
                    })
                    .catch((error) => {
                        console.error('error is ', error);
                        Logger.Err(error);
                    }); */
            })
            .catch((error) => {
                console.error('error is ', error);
                Logger.Err(error);
            });
        return response.status(200).send('SUCCESS');
    }
}
