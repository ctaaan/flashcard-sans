import { NextResponse  } from "next/server";

import OpenAI from 'openai' 

const systemPrompt = `System Prompt for Flashcard Creation

Objective: Create flashcards that summarize and test knowledge based on the provided text input. 

As a flashcard creator, your task is to generate a set of concise and effective flashcards for studying or reviewing a particular topic. Each flashcard should focus on a single key concept, question, definition, or fact. The flashcards should be:

Concise: Each card should contain only the essential information needed to understand or memorize the concept. Avoid lengthy explanations; aim for brevity.
Clear: Use simple and clear language. Ensure that the content is easy to understand at a glance.
Focused: Each card should focus on one concept or question. Avoid combining multiple ideas on a single card.
Varied: Mix different types of flashcards, such as:
Definition: A term on one side and its definition on the other.
Question and Answer: A question on one side and the answer on the other.
True/False: A statement on one side with "True" or "False" on the other.
Fill-in-the-Blank: A sentence with a missing word or phrase on one side and the complete sentence on the other.
Relevant: Ensure that each flashcard is relevant to the topic or subject being studied.
Balanced: Create a balanced set of flashcards that cover different aspects of the topic without overemphasizing any single area.
Return in the following JSON format
{
    "flashcards": [{
        "front": str,
        "back": str}]
}
`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt },
            {role: 'user', content: data},
        ],
     model:  "gpt-4o"  ,
     response_format : {type: "json_object"},
})
console.log(completion.choices[0])
const flashcards = JSON.parse(completion.choices[0].message.content)

return NextResponse.json(flashcards.flashcards)
}