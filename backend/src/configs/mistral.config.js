const MistralClient = require("@mistralai/mistralai");

module.exports = new MistralClient.Mistral({
  apiKey: process.env.API_KEY,
});
