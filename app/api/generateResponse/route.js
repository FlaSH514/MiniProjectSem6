// import { NextRequest, NextResponse } from "next/server";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// export async function POST(req) {

//   // get prompt field from the request body
//   const reqBody = await req.json();
//   const { userPrompt } = reqBody;
//   const model = new ChatGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_API_KEY,
//     modelName: "gemini-pro",
//     maxOutputTokens: 2048,
//   });

//   try {
//     const res = await model.invoke([["human",userPrompt]]);
//     console.log(res);
//     // const response = await result.response;
//     // const text = response.text();
//     return NextResponse.json({
//       res
//     });
//   } catch (error) {
//     return NextResponse.json({
//       text: "Unable to process the prompt. Please try again."
//     });
//   }
// }

// // Batch and stream are also supported

import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function POST(req) {
  const reqBody = await req.json();
  const { userPrompt } = reqBody;

  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY, // Ensure you have this set
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
  });

  try {
    const res = await model.invoke([["human", userPrompt]]);
    // console.log(res.content);
    return NextResponse.json({ res }); // Return the model's response directly
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again.",
    });
  }
}
