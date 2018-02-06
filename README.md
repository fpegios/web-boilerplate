#  Browser-sync + Nodemon + ExpressJS + Gulp4

ExpressJS server app with live-reloading using Browser-sync, Nodemon and Gulp4.

With the combination of these two, we can achieve the following use-cases:
* Inject changes into loaded page, when CSS are modified, without reloading the whole page.
* Reload page when affected files are modified (HTML, partials, client-side JavaScript code).
* Restart server when core server files are modified.

## Prerequisites
  - NodeJS

## Instructions
Execute the following command to load dependencies:
```sh
$ npm install -g gulp-cli
$ npm install
```

Run the project
```sh
$ gulp
```

## Additional
Clean generated dist folder
```sh
$ gulp clean
```