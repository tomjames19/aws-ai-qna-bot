### Create Alexa Skill
During the following steps you will export the current state of your QnA bot into Alexa. If you later have to rebuild your QnABot you will need to repeate steps 6-8 to apply changes to Alexa. 

1. Log in to the Alexa section of the developer portal at https://developer.amazon.com/.
2. In the Alexa Skills Kit box, choose Get Started to open the Alexa Skill Kit page. This displays any skills you've created.
3. Choose Add a New Skill. Fill in the required fields:
4. Skill Type (select Custom Interaction Model)   
> Language  
> Name  
> Invocation Name  

5. Choose Save to save the new skill and then choose Next.
6. Choose Launch Skill Builder. From the left menu, choose Code Editor.
7. Copy Lex Export schema JSON
> <button  class="clip" data-clipboard-text="{{bot.alexa}}">Copy to ClipBoard</button>
7. Paste the contents of the JSON file  into the code editor field.
8. Choose Apply Changes to save your changes and then choose Build Model.  

Once you have uploaded the schema into an Alexa skill you can make any changes necessary for running the skill with Alexa. For more information about creating an Alexa skill, see the Use the [Skill Builder (Beta)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-define-the-vui-with-gui) in the Alexa Skills Kit

### Publishing
If you want to publish your QnA skill, see [Submitting an Alexa Skill for Certification](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/publishing-an-alexa-skill)

### Test with an Alexa device
  
To access your unpublished skill, register your Alexa device to the same account as your Amazon Developer account. If you have a device that is not registered to the right account, you can re-register it by following these directions: [Registering an Alexa-enabled Device for Testing](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#h2_register)
  
You can also use the convenient 'Echo Sim' site to test your bot: https://echosim.io/  
    
Ask questions in the form: *"Alexa, ask Q and A, How do I use Q and A Bot?"*  (Assuming your device wake word is 'Alexa')


