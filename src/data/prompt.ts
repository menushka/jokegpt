export const example = `
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

export const prompt = (context: string) => `
Write jokes for all ages about '${context}' in the following format

Format:
${example}

5 more jokes in the same format as above are:
`.trim()
