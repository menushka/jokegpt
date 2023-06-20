'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'
import { useCompletion } from 'ai/react'

function convertPredictionToJokes(predition: string) {
  const regex = /Joke:\s?(.*)\nPunchline:\s?(.*)/gm

  let jokes = []
  let match
  while ((match = regex.exec(predition)) !== null) {
    const joke = match[1]
    const punchline = match[2]
    jokes.push({ joke, punchline })
  }

  return jokes
}

const Results = () => {
  const [prompt, setPrompt] = useState("")
  const [results, setResults] = useState<{ joke: string, punchline: string }[]>()
  const [error, setError] = useState(false)

  const { complete, isLoading: loading } = useCompletion({
    api: '/api/generate',
    onError: _error => setError(true),
    onFinish: (_prompt, completion) => setResults(convertPredictionToJokes(completion))
  })

  const handleGenerate: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setResults(undefined)
    setError(false)
    complete(prompt)
  }

  return (
    <>
      <form className='flex gap-2 mt-4 w-full max-w-2xl' onSubmit={handleGenerate}>
        <Input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder='Gimme something to start with...'
        />
        <Button
          className='flex-none grid grid-rows-1 grid-cols-1'
          disabled={loading}
          type='submit'
        >
          <span className={clsx('row-start-1 col-start-1', loading && 'invisible')}>Generate</span>
          {loading && <Loader2 className='row-start-1 col-start-1 w-full h-full animate-spin' />}
        </Button>
      </form>
      <div className={clsx(
        'flex flex-col gap-2 mt-4 w-full max-w-2xl overflow-hidden transition-[max-height] duration-1000 ease-in-out',
        loading || (results?.length ?? 0 > 0) ? 'max-h-[100vh]' : 'max-h-0'
      )}>
        {loading && Array(5).fill({}).map((joke, index) =>
          <Result key={`${joke.joke}-${index}`} joke={joke} />
        )}
        {results?.map((joke, index) => (
          <Result key={`${joke.joke}-${index}`} joke={joke} />
        ))}
      </div>
      {results?.length === 0 || error &&
        <div className='text-sm italic'>Whoops, something went wrong, try again!</div>
      }
    </>
  )
}

const Result = ({ joke }: { joke: { joke: string, punchline: string } }) => {
  return (
    <Card className='p-4 flex flex-col gap-2'>
      {joke.joke && joke.punchline ? (
        <>
          <CardContent className='py-0'>
            {joke.joke}
          </CardContent>
          <CardContent className='py-0'>
            {joke.punchline}
          </CardContent>
        </>
      ) : (
        <>
          <Skeleton className='w-full h-[20px]' />
          <Skeleton className='w-full h-[20px]' />
        </>
      )

      }
    </Card>
  )
}

export { Results }
