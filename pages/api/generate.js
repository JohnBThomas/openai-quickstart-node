import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      temperature: 0.9,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    console.log(completion.data);
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(question) {
  //const capitalizedQuestion =
    //question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Using the historical data listed below, try to predict what the 1st Winning Number, 2nd Winning Number, 3rd Winning Number, 4th Winning Number, 5th Winning Number, and Powerball number will be for a future draw date. Take into account the previous winning numbers by draw date and use the winning number sequence as they were drawn to define patterns. Compare the draw date winning numbers for any patterns that might indicate patterns or dependencies between other draw date winning number to use for estimating probabilities of a future draw date winning numbers being drawn. 
 
  Draw Date: 01-14-2023
  1st Winning Number: 24
  2nd Winning Number: 26
  3rd Winning Number: 39
  4th Winning Number: 47
  5th Winning Number: 57
 
  Draw Date: 01-11-2023
  1st Winning Number: 4
  2nd Winning Number: 8
  3rd Winning Number: 46
  4th Winning Number: 47
  5th Winning Number: 48
  
  Draw Date: 01-09-2023
  1st Winning Number: 18
  2nd Winning Number: 43
  3rd Winning Number: 48
  4th Winning Number: 60
  5th Winning Number: 69
  Powerball: 14
 
  Draw Date: 01-07-2023
  1st Winning Number: 35
  2nd Winning Number: 36
  3rd Winning Number: 44
  4th Winning Number: 45
  5th Winning Number: 67
  Powerball: 14
 
  Draw Date: 01-04-2023
  1st Winning Number: 12
  2nd Winning Number: 32
  3rd Winning Number: 56
  4th Winning Number: 67
  5th Winning Number: 68
  Powerball: 26
 
  Draw Date: 01-02-2023
  1st Winning Number: 7
  2nd Winning Number: 9
  3rd Winning Number: 12
  4th Winning Number: 31
  5th Winning Number: 62
  Powerball: 22
 
  Draw Date: 12-31-2022
  1st Winning Number: 18
  2nd Winning Number: 37
  3rd Winning Number: 44
  4th Winning Number: 50
  5th Winning Number: 64
  Powerball: 11
 
  Draw Date: 12-28-2022
  1st Winning Number: 26
  2nd Winning Number: 32
  3rd Winning Number: 38
  4th Winning Number: 45
  5th Winning Number: 56
  Powerball: 1
 
  Draw Date: 12-26-2022
  1st Winning Number: 17
  2nd Winning Number: 41
  3rd Winning Number: 47
  4th Winning Number: 60
  5th Winning Number: 61
  Powerball: 17
 
  Draw Date: 12-24-2022
  1st Winning Number: 17
  2nd Winning Number: 37
  3rd Winning Number: 46
  4th Winning Number: 54
  5th Winning Number: 67
  Powerball: 8
 
  Draw Date: 12-21-2022
  1st Winning Number: 12
  2nd Winning Number: 15
  3rd Winning Number: 24
  4th Winning Number: 34
  5th Winning Number: 59
  Powerball: 14
 
  Draw Date: 12-19-2022
  1st Winning Number: 7
  2nd Winning Number: 37
  3rd Winning Number: 55
  4th Winning Number: 65
  5th Winning Number: 67
  Powerball: 12
 
  Draw Date: 12-17-2022
  1st Winning Number: 33
  2nd Winning Number: 56
  3rd Winning Number: 64
  4th Winning Number: 66
  5th Winning Number: 68
  Powerball: 12
 
  Draw Date: 12-14-2022
  1st Winning Number: 36
  2nd Winning Number: 51
  3rd Winning Number: 59
  4th Winning Number: 66
  5th Winning Number: 68
  Powerball: 25
 
  Draw Date: 12-12-2022
  1st Winning Number: 16
  2nd Winning Number: 31
  3rd Winning Number: 50
  4th Winning Number: 55
  5th Winning Number: 61
  Powerball: 9
 
  Draw Date: 12-10-2022
  1st Winning Number: 9
  2nd Winning Number: 23
  3rd Winning Number: 47
  4th Winning Number: 49
  5th Winning Number: 68
  Powerball: 19
 
  Draw Date: 12-07-2022
  1st Winning Number: 6
  2nd Winning Number: 28
  3rd Winning Number: 44
  4th Winning Number: 59
  5th Winning Number: 61
  Powerball: 21
 
  Draw Date: 12-05-2022
  1st Winning Number: 35
  2nd Winning Number: 45
  3rd Winning Number: 47
  4th Winning Number: 54
  5th Winning Number: 55
  Powerball: 14
 
  Draw Date: 12-03-2022
  1st Winning Number: 6
  2nd Winning Number: 13
  3rd Winning Number: 33
  4th Winning Number: 36
  5th Winning Number: 37
  Powerball: 7
 
  Draw Date: 11-30-2022
  1st Winning Number: 4
  2nd Winning Number: 19
  3rd Winning Number: 24
  4th Winning Number: 47
  5th Winning Number: 66
  Powerball: 10
 
  Draw Date: 11-28-2022
  1st Winning Number: 29
  2nd Winning Number: 30
  3rd Winning Number: 32
  4th Winning Number: 48
  5th Winning Number: 50
  Powerball: 20
 
  Draw Date: 11-26-2022
  1st Winning Number: 15
  2nd Winning Number: 30
  3rd Winning Number: 47
  4th Winning Number: 50
  5th Winning Number: 51
  Powerball: 3
 
  Draw Date: 11-23-2022
  1st Winning Number: 1
  2nd Winning Number: 2
  3rd Winning Number: 31
  4th Winning Number: 39
  5th Winning Number: 66
  Powerball: 25
 
  Draw Date: 11-21-2022
  1st Winning Number: 1
  2nd Winning Number: 6
  3rd Winning Number: 40
  4th Winning Number: 51
  5th Winning Number: 67
  Powerball: 2
 
  Draw Date: 11-19-2022
  1st Winning Number: 7
  2nd Winning Number: 28
  3rd Winning Number: 62
  4th Winning Number: 63
  5th Winning Number: 64
  Powerball: 10
 
  Draw Date: 11-16-2022
  1st Winning Number: 28
  2nd Winning Number: 34
  3rd Winning Number: 51
  4th Winning Number: 53
  5th Winning Number: 56
  Powerball: 11
 
  Draw Date: 11-14-2022
  1st Winning Number: 19
  2nd Winning Number: 35
  3rd Winning Number: 53
  4th Winning Number: 54
  5th Winning Number: 67
  Powerball: 21
 
  Draw Date: 11-12-2022
  1st Winning Number: 16
  2nd Winning Number: 20
  3rd Winning Number: 44
  4th Winning Number: 57
  5th Winning Number: 58
  Powerball: 6
 
  Draw Date Guessed: 1-16-2023
  1st Winning Number Guessed: 14
  2nd Winning Number Guessed: 38
  3rd Winning Number Guessed: 41
  4th Winning Number Guessed: 52
  5th Winning Number Guessed: 59
  Powerball Guessed: 9

  Draw Date Guessed: 1-16-2023
  1st Winning Number Guessed: 47
  2nd Winning Number Guessed: 15
  3rd Winning Number Guessed: 44
  4th Winning Number Guessed: 36
  5th Winning Number Guessed: 68
  Powerball Guessed: 8

  Draw Date Guessed: 1-16-2023
  1st Winning Number Guessed: 33
  2nd Winning Number Guessed: 23
  3rd Winning Number Guessed: 37
  4th Winning Number Guessed: 58
  5th Winning Number Guessed: 63
  Powerball Guessed: 16

  Draw Date: ${question}
  1st Winning Number:
  2nd Winning Number:
  3rd Winning Number:
  4th Winning Number:
  5th Winning Number:
  Powerball:
`
}
