import { http } from '@architect/functions'

export async function handler (req) {

  // read the session
  let { count } = await http.session.read(req)

  // set a default value if the count isn't here
  if (!count) 
    count = 0 

  // incr the count
  count += 1

  // get a cookie string
  let cookie = await http.session.write({ count })

  // write the response
  return {
    statusCode: 303,
    headers: { 
      'set-cookie': cookie, 
      'location': '/'
    }
  }
}
