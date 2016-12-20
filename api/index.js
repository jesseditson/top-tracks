const { send } = require('micro')
const match = require('fs-router')(__dirname + '/routes')

module.exports = async function(req, res) {
  let matched = match(req)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  if (matched) return await matched(req, res)
  send(res, 404, { error: 'Not found' })
}
