const Task = require("../models/Task");
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

exports.getTaskRecommendations = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0) {
            return res.json({
                recommendations: [],
                message: "No tasks available for analysis",
            });
        }

        const taskSummary = tasks.map((t) => ({
            title: t.title,
            status: t.status,
            priority: t.priority,
        }));

        const prompt = `
You are an AI project management assistant.

Analyze the following tasks and suggest improvements.

Tasks:
${JSON.stringify(taskSummary, null, 2)}

Return STRICT JSON ONLY in this format:
{
  "recommendations": [
    {
      "title": "string",
      "suggestedPriority": "low | medium | high",
      "suggestedStatus": "todo | in-progress | done",
      "reason": "short explanation"
    }
  ]
}
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You are a helpful AI assistant." },
                { role: "user", content: prompt },
            ],
            temperature: 0.3,
        });

        const aiResponse = completion.choices[0].message.content;

        // Groq usually returns clean JSON, but we still guard it
        const parsed = JSON.parse(aiResponse);

        res.json(parsed);
    } catch (error) {
        console.error("GROQ AI ERROR:", error.message);
        res.status(500).json({
            message: "AI recommendation failed",
            error: error.message,
        });
    }
};
