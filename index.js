import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

// async function main() {
//   const chatCompletion  = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: 'user', content: 'What is the capital of Massachusetts?' }
//     ]
//   });


//   console.log(chatCompletion.data.choices[0].message.content);
// }


async function main() {
  console.log(colors.bold.green("Welcome to the chatbot program!"))
  console.log(colors.bold.green("You can start chatting with the bot!"))

  const chatHistory = []; // Store conversation history
  
  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      //construct messages by iterating over the history

      const messages = chatHistory.map(([role, content]) => ({role, content}))

      //add latest user input
      messages.push({role: 'user', content: userInput});
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      // get completion text/content
      const completionText = completion.data.choices[0].message.content;
      if (userInput.toLowerCase() == 'exit') {
        return;
      }
      console.log(colors.green('Bot: ') + completionText);

      //update history with user input and assiatant response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
      
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();