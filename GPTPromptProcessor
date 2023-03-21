public with sharing class GPTPromptProcessor {

    @AuraEnabled
    public static String processPrompt(String prompt, Double temperature, String bearer) {
    //this method uses the Davinci model which has a prompt/repsonse format. It accepts a prompt, temperature, and bearer as inputs and returns a response from the OpenAI API
        // Strip out any HTML
        prompt = prompt.replaceAll('<[^>]*>', '');
        //This is a crude way to limit the payload size to avoid API errors, there is a python library call tiktoken that will count tokens
        String[] tokens = prompt.split(' ');
        Integer tokenCount = tokens.size();
        Integer maxtokens = 4000 - (tokenCount * 3);
        //Build the body of the request
        String reqBody = '{' +
            ' "model": "text-davinci-003",' +
            ' "prompt":" ' + prompt + ' ", ' +
            ' "temperature": ' + temperature + ', ' +
            ' "max_tokens": ' + maxtokens + ',' +
            ' "stream": false, '+
            ' "top_p": 1 ';
        reqBody += '}';
        String endpoint = 'https://api.openai.com/v1/completions';
        //send the body to the HTTP callout, format response
        String promptResponse = callGPT(reqBody, endpoint, bearer).getBody().replace('\\n', '<br/>');
        // Parse the JSON response to get just what we care about in the body and remove the leading line breaks from the response
        String cleanprompt = parseDavinciJSON(promptResponse);
        if (cleanprompt.startsWith('<br/><br/>')) {
            cleanprompt = cleanprompt.substring(10);
        }
        return cleanprompt;
    }
    
    public static HttpResponse callGPT(String req, String endpoint, String rbearer) {
        //This method makes the callout and returns the JSON response
        Http http = new Http();    
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer ' + rbearer);
        request.setTimeout(120000);
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody(req);
        HttpResponse callGPT = http.send(request);
        return callGPT;
    }
    
    public static String parseDavinciJSON(String jsonString) {
        String text = '';
        try {
            // parse the json string into a map
            Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
            // get the 'choices' element
            List<Object> choices = (List<Object>) jsonMap.get('choices');
            if (choices != null && choices.size() > 0) {
                // get the first 'choice'
                Map<String, Object> choice = (Map<String, Object>) choices.get(0);
                if (choice != null) {
                    // get the 'text' element
                    text = (String) choice.get('text');
                } 
            } else {
                text = 'Your assistant was unavailable. Please try again.';
            }
        } catch (Exception e) {
            // log the error
            System.debug(e);
            text = 'Sorry, there was an error parsing the response';
        }
        return text;        
    }
}
