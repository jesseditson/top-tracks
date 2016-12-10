import React from 'react'
// import {fetchFromAPI} from '../lib/api'

export default class extends React.Component {
  static async getInitialProps () {
    // const things = await fetchFromAPI()
    return { }
  }
  render () {
    return <Layout page="index">
    </Layout>
  }
}
