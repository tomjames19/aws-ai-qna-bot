### Create Alexa Skill
During the following steps you will export the current state of your QnA bot into Alexa. If you later have to rebuild your QnABot you will need to repeate steps 6-9 to apply changes to Alexa. 

1. Click <Button class="build" v-on:click="build">Here</button> to rebuild your QnABot
2. Log in to the Alexa section of the developer portal at https://developer.amazon.com/.
3. In the Alexa Skills Kit box, choose Get Started to open the Alexa Skill Kit page. This displays any skills you've created.
4. Choose Add a New Skill. Fill in the required fields:
> Skill Type (select Custom Interaction Model)   
> Language   (select English)  
> Name  
> Invocation Name (for example "Q and A")
5. Choose Save to save the new skill and then choose Next.
6. Choose Launch Skill Builder. From the left menu, choose Code Editor.
7. Click <button  class="clip">Here</button> to copy Lex Export JSON
8. Paste the JSON from step 7  into the code editor field.
9. Choose Apply Changes to save your changes and then choose Build Model.  

Once you have uploaded the schema into an Alexa skill you can make any changes necessary for running the skill with Alexa. For more information about creating an Alexa skill, see the Use the [Skill Builder (Beta)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-define-the-vui-with-gui) in the Alexa Skills Kit

### Publishing
If you want to publish your QnA skill, see [Submitting an Alexa Skill for Certification](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/publishing-an-alexa-skill)

### Test with an Alexa device
  
To access your unpublished skill, register your Alexa device to the same account as your Amazon Developer account. If you have a device that is not registered to the right account, you can re-register it by following these directions: [Registering an Alexa-enabled Device for Testing](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#h2_register)
  
You can also use the convenient 'Echo Sim' site to test your bot: https://echosim.io/  
    
Ask questions in the form: *"Alexa, ask Q and A, How do I use Q and A Bot?"*  (Assuming your device wake word is 'Alexa')


