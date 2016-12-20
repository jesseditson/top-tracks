import store from 'store'
import qs from 'querystring'
import 'isomorphic-fetch'

export async function fetchSpotify(accessToken, url, query, body) {
  const token = `Bearer ${accessToken}`
  const method = body ? 'POST' : 'GET'
  try {
    const cfg = {
      method: method,
      headers: { 'Authorization': token }
    }
    let url = `https://api.spotify.com/v1/${url}?`
    if (body) cfg.body = JSON.stringify(body)
    if (query) url += qs.stringify(query)
    const req = await fetch(url, cfg)
    const data = await req.json()
    return data
  } catch(e) {
    console.log('error: ', e)
    return { error: e }
  }
}

export async function refreshToken(token) {
  try {
    const req = await fetch('http://localhost:4000/auth/spotify', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: token })
    })
    const user = await req.json()
    store.set('user', user)
    return { user }
  } catch(e) {
    console.error('error: ', e)
    return { error: e }
  }
}
