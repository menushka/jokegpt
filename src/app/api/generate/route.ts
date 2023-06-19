import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
})

const example = `
Joke: What's the best thing about Switzerland? 
Punchline: I don't know, but the flag is a big plus.
Joke: Did you hear about the mathematician who's afraid of negative numbers?
Punchline: He'll stop at nothing to avoid them.
Joke: Hear about the new restaurant called Karma?
Punchline: There's no menu: You get what you deserve.
Joke: How do you drown a hipster?
Punchline: Throw him in the mainstream.
Joke: What did the left eye say to the right eye?
Punchline: Between you and me, something smells.
`.trim()

const prompt = (context: string) => `
### Instruction ###
Write 5 jokes for a general audience using the following as context.  The result should only be newline separated, no numbered lists.

Example:
${example}

Context: ${context}

Continue:
`.trim()

async function getResponseFromReplicate(context: string) {
  const rawResponse = await replicate.run(
    "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
    {
      input: {
        prompt: prompt(context)
      }
    }
  ) as string[]
  return rawResponse.join('').trim()
}

async function getDevResponse() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return example
}
 
export async function POST(request: Request) {
  const body = await request.json()

  const context = body.context

  try {
    const response = process.env.FAKE_RESPONSE === 'true'
      ? await getDevResponse()
      : await getResponseFromReplicate(context)

    const regex = /Joke:\s?(.*)\nPunchline:\s?(.*)/gm

    let jokes = []
    let match
    while ((match = regex.exec(response)) !== null) {
      const joke = match[1]
      const punchline = match[2]
      jokes.push({ joke, punchline })
    }

    return NextResponse.json({ jokes })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong.' })
  }
}
