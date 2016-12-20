import React from 'react'
import qs from 'querystring'
import store from 'store'
import 'isomorphic-fetch'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentWillMount() {
    // :(
    if (typeof window !== 'undefined') {
      const res = await fetch('http://localhost:4000/auth/spotify?' + qs.stringify(this.props.url.query))
      const data = await res.json()
      if (data.error) {
        this.setState(data)
        alert(data.error)
        this.props.url.replaceTo('/login')
      } else {
        store.set('user', data)
        this.props.url.replaceTo('/')
      }
    }
  }
  render() {
    if (this.state.error) return <div>{this.state.error}</div>
    return <div></div>
  }
}
