# Chatbot

# Prerequisites

1.  [Twilio](www.twilio.com/referral/KqKLx8)  account
2. Dialogflow account
3. Node Js


# Twilio
Visit  [twilio](www.twilio.com/referral/KqKLx8) and sign up for a new account if you do not have one. You'll be given some credits to get you started. After they are over you'll need to pay to get more so use them wisely.

On your dashboard take note of your `Account SID` and `Auth Token`.
Head over to [https://www.twilio.com/console/sms/whatsapp/learn](https://www.twilio.com/console/sms/whatsapp/learn) and follow the instructions to connect your Whatsapp account to your sandbox. This is necessary for the sandbox environment. This is all you need for now, we'll come back to this later.

# Dialogflow
According to their  [website](https://cloud.google.com/dialogflow/) , 
> Dialogflow is an end-to-end, build-once deploy-everywhere development suite for creating conversational interfaces for websites, mobile applications, popular messaging platforms, and IoT devices. You can use it to build interfaces (such as chatbots and conversational IVR) that enable natural and rich interactions between your users and your business. Dialogflow Enterprise Edition users have access to Google Cloud Support and a service level agreement (SLA) for production deployments.

We will be using Dialogflow to power our chatbot. Head over to  [Dialogflow Console](https://dialogflow.cloud.google.com/) and create a new agent. I will not dive into the specifics of creating and training agents, handling entities, intents and more. That is beyond the scope of this tutorial. You can find multiple resources on this online. 

After creating your agent, click on the Small Talk tab on the left and enable it. This allows our bot to respond to small talk and common phrases. You can customize the responses on the same tab. You can do this for a more personalized experience. On the right side of your Dialogflow console, there's an input field where you can test out your bot.  

When you've tested out your bot and are satisfied you can now follow the steps below to set up authentication for accessing your chatbot via an API. 

1. On your Dialogflow console, open settings by clicking on the gear icon next to our project name.
2. Take note of the Project Id that is on the General tab of the settings page under Google Project section. We'll be using that later.
3. Follow the link next to Service Account.

![Screenshot from 2020-01-03 10-54-09.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1578038286605/d-43Cv2JA.png)
- Create a new service account, give it an appropriate name.

![Screenshot from 2020-01-03 11-00-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1578038475110/MHbbdz5dm.png)
- Set Dialogflow role to Dialogflow API Admin

![Screenshot from 2020-01-03 11-00-26.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1578038514884/R1t7VCjYK.png)
- Create a new key and choose JSON. 

![Screenshot from 2020-01-03 11-00-52.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1578038576712/FStn7eegM.png)
- Rename the downloaded JSON file to `credentials.json`. This is just so we can reference it easily. We will come back to this file later.
