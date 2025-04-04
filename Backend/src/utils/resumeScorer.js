const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const dotenv = require("dotenv");

dotenv.config();

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0,
  model : "llama-3.3-70b-versatile"
});

const template = `
You are an AI-powered Applicant Tracking System (ATS) responsible for evaluating how well a candidate's resume matches a specific job description and a list of job requirements.

### Evaluation Criteria:
Evaluate the resume based on the following:
1. **Technology Match:** Are the required technologies and tools explicitly mentioned? (e.g., Node.js, Express.js, MongoDB)
2. **Experience Relevance:** Does the candidate have relevant roles or projects aligned with the job's responsibilities?
3. **Keyword Overlap:** How many keywords or phrases from the job description and job requirements appear in the resume?
4. **Industry Terminology:** Does the resume use terminology relevant to the job's domain or industry?
5. **Soft Skills Alignment:** Are relevant soft skills, collaboration, or leadership experience mentioned?

### Scoring Instructions:
- Base the score strictly on factual overlaps between the resume and the job description and job requirements.
- If core required technologies or responsibilities are missing, apply strong penalties.
- Do not give credit for related experience unless explicitly mentioned.
- Be strict and realistic — resumes that don't mention key qualifications should receive low scores.

### Output Format:
Return a single float between 0 and 100 with no extra explanation or formatting.
**Only return the score.**

### Job Description:
{jobDescription}

### Job Requirements:
{formattedRequirements}

### Resume:
{resumeText}


`;

const promptTemplate = ChatPromptTemplate.fromTemplate(template);

const evaluateResumeWithGroq = async (resumeText, jobDescription, jobRequirement) => {
  try {
    if (!resumeText || !jobDescription || !jobRequirement) {
      throw new Error(" resumeText , jobDescription and jobRequirement all are required.");
    }

    const formattedRequirements = jobRequirement.map((req, i) => `${i + 1}. ${req}`).join('\n');


    const chain = promptTemplate.pipe(model)
    const response = await chain.invoke({jobDescription,formattedRequirements, resumeText});
    const score = parseFloat(response.content);

    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error("Invalid score received from model");
    }

    return score;
  } catch (error) {
    throw new Error(`Resume evaluation failed: ${error.message}`);
  }
};

module.exports = { evaluateResumeWithGroq };
