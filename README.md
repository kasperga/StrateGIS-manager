# StrateGIS-manager
## Manager and GUI for the StrateGIS solution

Made with Node.JS and angular

## Dependencies:
* Angular
* Angular-material
* Angular-Resource
* Angular-messages
* UI-Router
* msnodesqlv8




## Installation:

* Download or pull a copy.
* Install NPM if it is not already installed: https://www.npmjs.com/get-npm
* In the unpacked folder open a command prompt and write: NPM install
* Configure database settings in settings.js file that should be located in the root of the unpacked folder
   * the important options to change are database and server. 
      * Database is the name of the database
      * Server is the address of the database instance
* After installation is done start the server with the following command: node app

You should now be able to see the GUI in a browser on localhost:8000

## IIS Installation:

* Download or pull a copy from the IIS release branch
* Install NPM if it is not already installed: https://www.npmjs.com/get-npm
* In the unpacked folder open a command prompt and write: NPM install
* Under machine name in IIS, select Feature Delegation -> Handler Association and set to read/write
* Configure database settings in settings.js file that should be located in the root of the unpacked folder
   * the important options to change are database and server. 
      * Database is the name of the database
      * Server is the address of the database instance
   * Make sure the user running the app pool have access to the database
* Add the node application to a web page in IIS. Make sure it is setup to run at just the location and not ie. location/x/
* Install IIS URL rewrite module (remember to use the correct one for your IIS version)
* Download a build of iisnode. Run setup samples as it is the easiest way to setup various rules.

You should now be able to see the application in a browser.

