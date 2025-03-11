const mistral = require("../configs/mistral.config");

module.exports = {
  resumePage: async (filter, prompt) => {
    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      stream: false,
      messages: [
        {
          content: filter + prompt,
          role: "user",
        },
      ],
    });

    return result.choices[0].message.content || null;
  },
};
