import React from 'react'
import store from 'store'
import { refreshToken } from '../lib/api'
// TODO: why does use of layout give us an invariant violation?
// import Layout from './Layout'

export default function(Wrapped) {
  return class Authenticated extends React.Component {
    constructor(props) {
      super(props)
      const user = store.get('user')
      this.state = { user }
    }
    async componentWillMount() {
      if (this.state.user.refresh_token) {
        this.setState({ loading: true })
        const user = await refreshToken(this.state.user.refresh_token)
        if (user.error) {
          this.props.url.replaceTo('/login')
        }
        this.setState({ user: Object.assign(this.state.user, user), loading: false })
      } else {
        this.props.url.replaceTo('/login')
      }
    }
    render () {
      return this.state.loading
          ? <div>Logging in...</div>
          : <Wrapped {...this.state} {...this.props} />
    }
  }
}
