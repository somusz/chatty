Chatty App
=====================

A lightweight chat application. Each user can post messages with a random usarname color, and are able to change their usernames. Pictures (jpg, png, gif) get rendered on url entry.


## Usage

Clone the repo.
Install the dependencies and start the server.

For the server, navigate to the /chatty-server library:
```
npm install
npm start
```

For the application (in the root library):
```
npm install
npm start
open http://localhost:3000
```

## Linting

```
npm run lint
```

### Dependencies

* React
* Webpack
* WebSockets
* Uuid
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
