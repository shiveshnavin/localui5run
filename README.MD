# UI5 Local Runner

Make sure to use src="https://sapui5.hana.ondemand.com/1.69.0/resources/sap-ui-core.js" in your index.html or install the UI5 SDK in /resoruces

## Install & Run :
```
copy install.js to folder in which package.json is located
run : node install.js
```

## Manual Steps :

### Add @sap to npm registry
```
npm config set @sap:registry https://npm.sap.com
```

### Install UI5 CLI globally
```
npm install --global @ui5/cli  --cache-min 999999999
```

### Take a backup of ui5.yaml and add the middleware and destinations
```
If Already exists -- 
server:
  customMiddleware:
    - name: ui5-middleware-cfdestination
      afterMiddleware: compression
      configuration:
         debug: true
         port: 9087
         xsappJson: "xs-app.json"
         destinations:
            # check that the destination name (here: "backend") matches your router in xssppJson 
            - name: "api"
              url: "http://services.odata.org"

Else Create ui5.yaml --

metadata:
 name: ui
type: application
server:
 customMiddleware:
    - name: ui5-middleware-cfdestination
      afterMiddleware: compression
      configuration:
         debug: true
         port: 9087
         xsappJson: "xs-app.json"
         destinations:
            # check that the destination name (here: "backend") matches your router in xssppJson 
            - name: "api"
              url: "http://services.odata.org"

```

### Install ui5-middleware-cfdestination from npm
```
npm install --save-dev ui5-middleware-cfdestination  --cache-min 999999999

If this step fails. Download and extract https://github.com/petermuessig/ui5-ecosystem-showcase/archive/master.zip and run the below command in current directory.

npm install --save <path to extracted folder>\ui5-ecosystem-showcase-master\packages\ui5-middleware-cfdestination
               
```

### Add dependency of UI5 to package.json
```
    ....,
    "ui5": {
        "dependencies": [
            "ui5-middleware-cfdestination"
        ]
    }
    ....
```

### Make Sure to add destination in xs-app.json as well

### Build and Run

```
ui5 build
ui5 serve
```

Create a issue if any problem arises

