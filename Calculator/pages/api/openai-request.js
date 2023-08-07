const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function openAIRequest(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please provide the API key",
      },
    });
    return;
  }

  const data = req.body?.prompt;

  if (typeof data !== 'string') {
    res.status(400).json({
      error: {
        message: "Bad Request. 'data' field is missing or not a string in request body.",
      },
    });
    return;
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: data}],
    });

    const result = response.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during the request to the OpenAI API.',
        details: error.message,
      },
    });
  }
}

module.exports = openAIRequest; // changed this line
