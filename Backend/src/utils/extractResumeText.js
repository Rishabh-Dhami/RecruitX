const axios = require("axios");
const mammoth = require("mammoth");
const extract = require("pdf-text-extract");
const pdfParse = require("pdf-parse");

const downloadFile = async (fileUrl) => {
  try {

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "arraybuffer", // Get file as buffer
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to download file. HTTP Status: ${response.status}`,
      );
    }

    return response.data; // Return file buffer
  } catch (error) {
    throw new Error("Failed to download the resume.");
  }
};

async function extractTextFromPDF(url) {
  try {
    // Step 1: Fetch the PDF as a buffer
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const buffer = response.data;

    // Step 2: Extract text using pdf-parse
    const data = await pdfParse(buffer);// This contains the entire resume as plain text
    return data.text;
  } catch (error) {
    return null;
  }
}

const extractTextFromDocx = async (fileBuffer) => {
  try {
    if (!Buffer.isBuffer(fileBuffer)) {
      fileBuffer = Buffer.from(fileBuffer);
    }

    const result = await mammoth.extractRawText({
      buffer: new Uint8Array(fileBuffer),
    });

    return result.value;
  } catch (error) {
    throw new Error("Failed to extract text from DOCX.");
  }
};

module.exports = { extractTextFromPDF, extractTextFromDocx, downloadFile };
