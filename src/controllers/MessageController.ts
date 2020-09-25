import { Controller, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { runQuery } from '../utils/dialogflow';
import { sendMessage } from '../utils/twilio';

@Controller('api/message')
export class MessageController {
    @Post()
    private postSendMessage(request: Request, response: Response) {
        const { body, to, from } = request.body;
        console.log('BotCTRL post message');
        console.log({ body, to, from });

        runQuery(body, from)
            .then((result: any) => {
                // console.log('Dialogflow response', result.fulfillmentText);
                // console.log(result.fulfillmentMessages[0].text.text[0]);
                result.fulfillmentMessages
                    .reduce(function (sequence: Promise<any>, value: any) {
                        return sequence
                            .then(function () {
                                return sendMessage(to, from, value.text.text[0]);
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
            })
            .catch((error) => {
                console.error('error is ', error);
                Logger.Err(error);
            });
        return response.status(200).send({ msg: 'success' });
    }
}
