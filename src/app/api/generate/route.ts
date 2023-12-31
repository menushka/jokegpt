import { prompt } from '@/data/prompt'
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'
 
export async function POST(request: Request) {
  const { prompt: context } = await request.json()

  try {
    const cached = await kv.get(context)
    if (cached) {
      return new NextResponse(cached as ReadableStream)
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      stream: true,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0.25,
      presence_penalty: 0.1,
      prompt: prompt(context)
    })

    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        await kv.set(context, completion)
        await kv.expire(context, 24 * 60 * 60)
      }
    })
    return new StreamingTextResponse(stream)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong.' })
  }
}
