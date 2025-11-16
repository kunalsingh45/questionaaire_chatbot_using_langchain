import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


export const getAnswer = async (question) => {
    const prompt = PromptTemplate.fromTemplate(
        `Answer the question below:
        Question: {question}`);

    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-pro",
        maxOutputTokens: 2048,
        apiKey: process.env.GOOGLE_API_KEY
    });

    const chain = prompt
        .pipe(model)
        .pipe(new StringOutputParser());

    const response = await chain.invoke({ question });
    console.log(response)

    return response;

};