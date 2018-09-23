<<<<<<< HEAD
# Angular 1.6 KaiOS Application Boilerplate
This is KaiOS application boilerplate in angularJS 1.6, naviBoardJS and Gulp. Folder structure based on best practices from Angular team. We have used naviBoardJS for smooth spatial-navigation to avoid too much of redundant code for handling keypad based navigation.

### Conventions
- Each component should be made as reusable component, with its style, markup and services together
- Folders should be organized based on the component, not based on the type of files 
- Use Gulp to combine & minify CSS & JS


### Folder structure
```
| assets
        | img
| css
        | app.css
| dist   
        | assets
            | img
        | data
            |*.json
        | components
        | css
        | bundle.js
        | app.min.css
        | manifest.webapp
        | index.html
| data
        |*.json
| js
        |app
           | app.js
           | Constants.js
        |generic
           | *.js
        | toastr.min.js
        | index.html
| components
└─── home
       | home.html
       | home.css
       | home.js
services
       | *.js
lib
       | lib.min.js
package.json
gulpfile.js
index.html
manifest.webapp
.gitignore
```

### Steps to setup: 
- Clone the repository, then navigate to the folder
- Run `npm install`
- Run `npm run build` to build the `dist` files to make it ready to run
- Run `npm run start` to start web server.
- Web Server runs on `http://localhost:8000` 


### Steps for DEVELOPMENT AND PRODUCTION build: 
- `npm run build` ---> developement build , similarly `npm run build:prod` respectively will give a dist folder(Desired build) in the main project.
- Put the respective constants in the data/Constants.json according to the desired build.This will help to frame the Constants.js in js/app.
=======
# kaios-angular-app
Sample application for kaios loaded feature phones with angular1.6,spatial-navigation and gulp.
>>>>>>> ba37454e06f5247bb6d0b0b725e46dde4b6a1c45
