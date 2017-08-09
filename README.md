# Code API BlueSky #

**Pre-requisites:**
* Node (version 8 or greater)
* NPM (version 5 or greater)
* MongoDB (version 3.2 or greater)
* (optional) PM2 - Service Management

**Setting up your local environment:**
To Setup the Environment for the first time:

```bash
npm install
```

To Setup the Intellisense in VisualStudio Code:

```bash
typings install
```

To run the server:
```bash
node server.js
```
*(This will run the API in development mode. It doesn't provide livereload so any change to the API has to be reloaded manually)*

For Production environment is recommended to use [PM2](http://pm2.keymetrics.io/docs/usage/quick-start/) and run:
```bash
pm2 start process.yml
```

To Run Tests:
```bash
./node_modules/.bin/mocha -u exports tests
```

**Configurations:**

To change the server IP address, ports and the transaction maximum size limit edit the **server.js** file.