import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { userMessage } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert on Shadow Slave. Only answer questions about the novel."
        },
        { role: "user", content: userMessage }
      ],
    });

    return Response.json(completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI Error:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}