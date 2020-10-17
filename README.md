# Use Instructions
* Clone this repository into an empty folder
* With your command line interface, go to the folder where the repository has been cloned and execute "composer install". Then, run "yarn install". Then run "yarn encore dev". This will download all the necessary dependencies and will compile JSX & SCSS files.
* To run the sample code, execute: "symfony server:start". This will start a local server where the project runs. Use your favorite browser and go to the URL the last command indicates.

# Features
You will get a page with an input field. This field will, once some characters are introduced, suggest options based on an API endpoint. One can select suggested options by clicking on them or by navigating through them with the up and down arrows of the keyboard and accepting options with ENTER or TAB keys.

All the options are downloaded from the API the first time the user puts focus on the input and are locally filtered as the user types.

# Integration
This package is supposed to be an UI KIT that integrates with other parts of a website. The system expects a translation system to provide localized strings on the Symfony Controller.

The UI Kit accepts a callback that is called when an option is selected. The callback is called with the following parameters: option id, option normalized name and option  name. The sample page included as an example calls console.log with those parameters.

# Content of the repository
* **assets/live-search-input** all the JS and CSS files necessary specifically to paint the UI KIT.
* **assets/css** CSS info that would be expected to be available as part of the general website.
* **assets/react-parents/sample-page** JS and CSS necessary to load a sample page that contains only the UI KIT.
* **assets/tools** JS files that take care of some generic responsabilities needed for the UI Kit that should be available for other kits. (ajax-promise.js has been reused from another project)
* **src/Controller** & **templates** files that paint the context for the sample page.