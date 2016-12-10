import React from 'react'
import Layout from '../components/Layout'

export default class Error extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  render () {
    return (<Layout>
      <h1>Error</h1>
      <span>
        {
          this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'
        }
      </span>
    </Layout>)
  }
}
