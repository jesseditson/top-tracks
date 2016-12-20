import React from 'react'
import Head from 'next/head'
import 'glamor/reset'


export default class Layout extends React.Component {
  render () {
    return (
      <div className="layout">
        <Head>
          <title>Top Tracks - {props.page}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          // <link href="https://fonts.googleapis.com/css?family=Amatic+SC|Julius+Sans+One" rel="stylesheet"/>
          <link rel="stylesheet" href="/static/global.css"/>
        </Head>
        {props.children}
      </div>
    )
  }
}
