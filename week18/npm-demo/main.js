const npm = require('npm')

const config = {
  "name": "npm-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "npm": "^6.14.7"
  }
}

npm.load(config, () => {
  npm.install('webpack', err => {
    console.log(err)
  })
})
