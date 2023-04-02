const OPENAI_API_KEY = "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";

export async function generateQuiz(prompt) {
  const url = "https://api.openai.com/v1/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:`Generate 1 quiz about "${prompt}" 
      with 4 variants and right answer, result must be json syntax like this: 
      {
        "quiz": {
            "question": "",
            "options": [
            "",
            "",
            "",
            ""
            ],
            "correctAnswer": ""
        }
        }
      `,
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return data.choices[0].text.trim();
}
