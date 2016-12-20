const { send, json } = require('micro')
const qs = require('querystring')
const secrets = require('load-secrets')
require('isomorphic-fetch')

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const AUTH_STRING = new Buffer(`${secrets.SPOTIFY_CLIENT_ID}:${secrets.SPOTIFY_CLIENT_SECRET}`).toString('base64')

module.exports.GET = async function(req, res) {
  const cfg = {
    method: 'POST',
    body: qs.stringify({
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'http://localhost:3000/auth/callback'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${AUTH_STRING}`
    }
  }
  const request = await fetch(SPOTIFY_TOKEN_URL, cfg)
  const response = await request.json()
  send(res, 200, response)
}

module.exports.POST = async function(req, res) {
  const data = await json(req)
  const cfg = {
    method: 'POST',
    body: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: data.refresh_token,
      redirect_uri: 'http://localhost:3000/auth/callback'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${AUTH_STRING}`
    }
  }
  const request = await fetch(SPOTIFY_TOKEN_URL, cfg)
  const response = await request.json()
  send(res, 200, response)
}
