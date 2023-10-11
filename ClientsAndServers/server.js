const http = require('http')
const fs = require('fs')

/**
 * Request object and response object
 */
const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  // Set header content type
  res.setHeader('Content-Type', 'text/html')

  let path = './views/'

  switch(req.url) {
    case '/':
      path += 'index.html'
      res.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      res.statusCode = 200
      break
    case '/about-me': // Redirecting
      res.statusCode = 301
      res.setHeader('Location', '/about')
      res.end()
      break
    default: 
      path += '404.html'
      res.statusCode = 404
      break
  }

  // Send a HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } 
    else {
      //res.write(data)
      res.end(data)
    }
  })

  /**
  res.write('<p> Hello, guys </p>')
  res.write('<button> Button </button>')
  res.end()
  */
})

server.listen(3000, 'localhost', () => {
  console.log('Listening for requests on port 3000')
})