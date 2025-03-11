const mistralService = require("../services/mistral.service");
const marked = require("marked");

module.exports = {
  resume: async (req, res) => {
    try {
      const filter = req.body.filter;
      const prompt = req.body.message;
      if (prompt === null || filter === null)
        return res
          .status(400)
          .send("Missing filter or message in request body");

      const result = await mistralService.resumePage(filter, prompt);
      res.json({ response: marked.parse(result) });
    } catch (error) {
      console.error(error.message);
    }
  },
};
