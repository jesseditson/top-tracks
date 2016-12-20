import React from 'react'
import authenticated from '../components/authenticated'
import { fetchSpotify } from '../lib/api'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentWillMount() {
    const token = this.props.user && this.props.user.access_token
    if (token) {
      const response = await fetchSpotify(token, 'me/top/tracks', { limit: 50 })
      const albums = await Object.keys(response.items.reduce((o, t) => {
        o[t.id] = t
        return o
      }, {})).map(a => fetchSpotify(token, 'albums/' + a))
      console.log(albums)
      this.setState({ tracks: response.items })
    }
  }
  renderTrack(track) {
    let src = `https://embed.spotify.com/?uri=spotify:track:${track.id}`
    return <iframe src={src} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
  }
  renderTracks() {
    if (!this.state.tracks) return null
    return this.state.tracks.map(t => <li key={t.id}>{this.renderTrack(t)}</li>)
  }
  render() {
    console.log('tracks', this.state.tracks)
    return <div>
      <h2>Spotify Tracks</h2>
      <ol>{this.renderTracks()}</ol>
    </div>
  }
}

export default authenticated(Index)
