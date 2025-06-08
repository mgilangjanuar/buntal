import { h } from '@buntal/core'

export const GET = h(async (_, res) => {
  const resp = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GH_PERSONAL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
        user(login:"mgilangjanuar") {
          ... on Sponsorable {
            sponsors(first: 100) {
              totalCount
              nodes {
                ... on User { login, avatarUrl, name }
              }
            }
          }
        }
      }`,
      variables: {}
    })
  })
  const json = await resp.json()
  return res.json(
    json.data.user.sponsors.nodes as {
      login: string
      avatarUrl: string
      name: string
    }[]
  )
})
