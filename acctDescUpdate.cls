public with sharing class acctDescUpdate {
    @AuraEnabled
      public static void updateDesc(Id acctId) {        
          //update the Description field of the specified Account record
          Account acct = [SELECT Name, Description FROM Account WHERE Id = :acctId];       
          String acctName = acct.Name;
          //Build your custom prompt by merging in the account name to a static prompt
          String prompt = 'Provide a description of what this company does in 255 characters or less: ' + acctName;
          //Use a temperature value between 0 and 1
          Double temperature = 0.5;
          //Use the bearer you set up in your OpenAI account
          String bearer = 'ENTER YOUR BEARER HERE';
          String result = GPTPromptProcessor.processPrompt(prompt, temperature, bearer);
          acct.Description = result;
          try {
              update acct;
          } catch (Exception e) {
              //log the exception
              System.debug(e.getMessage());
          }
    }
}
