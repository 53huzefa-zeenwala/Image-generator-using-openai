const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const {text, size} = req.body
    const sizeImage = size === 'large' ? '1024x1024' : size === 'medium' ? '512x512' : '256x256'
  try {
    const response = await openai.createImage({
      prompt: text,
      n: 3,
      size: sizeImage,
    });
    // const imageUrl = response.data.data[0].url
    const imageUrl = response.data.data;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { generateImage };
