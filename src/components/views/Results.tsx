'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'

const Results = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ joke: string, punchline: string }[]>()

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setResults(undefined)
      const response = await fetch('/api/generate', { method: 'post', body: JSON.stringify({ context: prompt }) }).then(res => res.json())
      const jokes = response.jokes
      setResults(jokes)
    } catch (err) {
      console.error('Error fetching jokes', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex gap-2 mt-4 w-full max-w-2xl'>
        <Input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder='Gimme something to start with...'
        />
        <Button
          className='flex-none grid grid-rows-1 grid-cols-1'
          onClick={handleGenerate}
          disabled={loading}
        >
          <span className={clsx('row-start-1 col-start-1', loading && 'invisible')}>Generate</span>
          {loading && <Loader2 className='row-start-1 col-start-1 w-full h-full animate-spin' />}
        </Button>
      </div>
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
      {results?.length === 0 &&
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
