const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const evaluateResumeWithGroq = async (resumeText, jobDescription) => {
  const prompt = `
  You are an AI-powered Applicant Tracking System (ATS) trained to evaluate resumes against job descriptions.

### Task:
- Compare the resume with the job description.
- Assess based on:
  - Relevance of experience
  - Skills and technology match
  - Industry-specific terminology
  - Soft skills alignment
  - Keyword overlap

### Output:
Return a single numerical match score between 0 and 100.
Do not include any explanation or additional text.

### Job Description:
${jobDescription}

### Resume:
${resumeText}
  `;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const score = parseFloat(response.data.choices[0].message.content.trim());
  return score;
};

module.exports = { evaluateResumeWithGroq };
