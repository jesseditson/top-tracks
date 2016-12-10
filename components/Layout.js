import React from 'react'
import Head from 'next/head'
import 'glamor/reset'

export default (props) => (
  <div className="layout">
    <Head>
      <title></title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      // <link href="https://fonts.googleapis.com/css?family=Amatic+SC|Julius+Sans+One" rel="stylesheet"/>
      <link rel="stylesheet" href="/static/global.css"/>
    </Head>
    {props.children}
  </div>
)
