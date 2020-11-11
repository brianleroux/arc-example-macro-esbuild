import * as React from 'react'
import * as Server from 'react-dom/server'
import { layout } from './layout'
import { http } from '@architect/functions'

let Form = props=> <form action="/count" method="post">
  <button>Count: { props.count }</button>
</form>

let Greet = (props) => <div>
  <h1 className="margin-bottom-16">Hello modernjs!</h1>
  <Form count={ props.count }/>
</div>

export async function handler (req) {

  // read the session
  let { count } = await http.session.read(req)

  // set a default value
  if (!count) 
    count = 0

  // render the greeting
  let body = Server.renderToString(<Greet count={ count } />)

  // write the response
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: layout(body)
  }
}
