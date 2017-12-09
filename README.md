# Family Feud Trivia

A Christmas time Family Feud Style trivia game

Questions can be found / edited in : /js/questions.js

### Install dependencies

```
npm install
```

### Developing locally

1. Run

	```
	npm run dev
	```

2. In your browser, navigate to: [http://localhost:8080/](http://localhost:8080/)

### Publish

1. In `webpack.config.js` file, replace `www.example.com` with the real domain name.

2. Run

	```
	npm run build
	```

3. Copy the following folders/files to web server

	/build,
	/image,
	index.html



### Todo

[ ] Add localStorage to save scores
[ ] Add ability to start new game
[ ] Add rounds that have multipliers (ie answers are worth double or triple)
[ ] Move HTML to index or to mustache templates
[ ] Add ability to edit team names before game
[ ] Add in more animations (wrong answer animations, flash background yellow lights on correct answer, etc)







### Thanks to the following repos

Appreciation to the code developed, used in this project:

* [Webpack Boilerplate](https://github.com/geniuscarrier/webpack-boilerplate)
* [Family Feud Codepen](https://codepen.io/MacEvelly/pen/rLWeYP)
