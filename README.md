# sfdc-gpt-action-demo

A simplistic example of how to use a lightning action in salesforce to send a prompt + record data to OpenAI and update the record with the response
This example updates an Account Description, but it can be modified for any use case
You will need to setup an account with OpenAI and get your API key (bearer) here: https://platform.openai.com/account/api-keys
Create a Lightning Action on the Account for the LWC
Invoking the LWC will create toast events on the page - there is no UI for the LWC
