import React from 'react'
import qs from 'querystring'
import store from 'store'

const SPOTIFY_CLIENT_ID='ac800c418a9f4dbab10563c65b0034fe'
const SCOPES = 'playlist-modify-public playlist-modify-private user-top-read'

export default class Login extends React.Component {
  componentWillMount() {
    const user = store.get('user')
    if (user && user.refresh_token) {
      this.props.url.replaceTo('/')
    }
  }
  loginLink() {
    let query = qs.stringify({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/auth/callback',
      scope: SCOPES,
      state: '',
      show_dialog: true
    })
    return <a href={`https://accounts.spotify.com/authorize?${query}`}>Log in with Spotify</a>
  }
  render() {
    return <div>
      {this.loginLink()}
    </div>
  }
}
