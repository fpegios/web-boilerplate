#  Web Boilerplate
ExpressJS server app with live-reloading using Browser-sync, Nodemon and Gulp4.

![alt text](https://fpegios.000webhostapp.com/fpegios/images/portfolio/gulp_express_browsersync_nodemon.png)

## Description
With the combination of Browser-sync, Nodemon and Gulp4, we can achieve the following use-cases:
* Inject changes into loaded page, when CSS are modified, without reloading the whole page.
* Reload page when affected files are modified (HTML, partials, client-side JavaScript code).
* Restart server when core server files are modified.

## Prerequisites
  - NodeJS

## Instructions
### Install Dependencies
Execute the following command to load dependencies:
```sh
$ npm install -g gulp-cli
$ npm install
```
### Run the project
Execute the following command to run the project:
```sh
$ gulp
```

## Code Instructions
### Include HTML components into index.html
You can include different HTML components into `index.html`. For instance if you want to include a header component, these are the steps that have to be followed:
* In the directory *src/components/*, create the file *header.html*
* In the directory *src/styles/components/*, create the file *header.scss*, and it should look like this:
```sh
[data-component="header"] {
    // scss code regarding header
}
```
* Insert in the `body` of `index.html` the following line of code:
``` sh
<div data-component="header"></div>
```
The function `includeComponents()`, which exists in the file `src/scripts/functions.js`, is responsible for including the HTML components into the DOM.

When all the the components are loaded, then the function `initClickEvents()`, which exists in the file `src/scripts/click-events.js`, is called. In this function, all click-events have to be declared.

## Additional
Execute the following command to clean the `dist` folder:
```sh
$ gulp clean
```