const { exec } = require("child_process");
var op = function (error, stdout, stderr) {
    if (error) {
        console.log(`ERR : ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`WARN: ${stderr}`);

    }
    console.log(`INFO: ${stdout}`);
    step = step + 1
    if (step < commands.length)
        doit(step);
};
var step = 0
var commands = [ 
{
    msg: ">> Installing Setup Dependencies...This may take a while", cmd: function (step) {
         
        exec("npm install --save-dev fs --cache-min 999999999", op);
    }
},{
    msg: ">> Check Install", cmd: function (step) {
        var fs = require("fs")
        if (fs.existsSync('.localui5')) {
            console.log("LocalUI5 Already Installed : Delete .localui5 and rerun index.js to ReInstall")
            step=commands.length - 1
            doit(step)
        }
        step=step+1
        doit(step)
    }
},{
    msg: ">> Adding @sap to NPM registry", cmd: function (step) {
        exec("npm config set @sap:registry https://npm.sap.com", op);
    }
}, {
    msg: ">> Installing UI5 Tooling", cmd: function (step) {

        exec("npm list --global", function (error, stdout, stderr) {
            if (error) {
                console.log(`ERR : ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`WARN: ${stderr}`);

            }
            console.log(`INFO: ${stdout}`);
            if (stdout.indexOf("@ui5/cli") > -1) {
                console.log("UI5 Found. Skipping install");
                exec("echo SKIP", op)
            }
            else {
                console.error("UI5 is not found. Installing...This may take a while");
                exec("npm install --global @ui5/cli  --cache-min 999999999", op)
            }
        })


    }
}, {
    msg: ">> Initialize local ui5 .", cmd: function (step) {

        var fs = require("fs")
        if (fs.existsSync('ui5.yaml')) {

            fs.copyFileSync("ui5.yaml","ui5.yaml.bak")
            var conf=fs.readFileSync('ui5.yaml')
            console.log(`ALERT !! Looks like you have ui5.yaml present . We will try to add dependency at the end of file .
             If error occurs please remove ui5.yaml and replace it with the backup file ui5.yaml.bak by renaming`)
            
 var text=`server:
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
              url: "http://services.odata.org"`
           
            if(conf.indexOf("ui5-middleware-cfdestination")<=-1)
            {
                fs.appendFileSync('ui5.yaml', text);
            }           

        }
        else {
var text=`specVersion: '1.0'
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
              url: "http://services.odata.org"`
           
            fs.writeFileSync('ui5.yaml', text);
        }
        console.log("~~~~~~~~Configure your destinations in ui5.yaml~~~~~~~~~")
        step = step + 1
        if (step < commands.length)
            doit(step);


    }
}, {
    msg: ">> Installing dependency for Destinations...This may take a while", cmd: function (step) {
        exec("npm install --save-dev ui5-middleware-cfdestination  --cache-min 999999999", op);

    }
},
{
    msg: ">> Installing dependency for Reverse Proxying...This may take a while", cmd: function (step) {
        exec("npm install --save-dev ui5-middleware-simpleproxy  --cache-min 999999999", op);

    }
}, {
    msg: ">> Configuring Destination Server", cmd: function (step) {
        var fs = require("fs")
        fs.copyFileSync("package.json","package.json.bak")
        var package=fs.readFileSync("package.json")
        var pkg=JSON.parse(package)
        pkg.ui5 = {dependencies:["ui5-middleware-cfdestination"]}
        console.log(pkg)
        fs.writeFileSync("package.json",JSON.stringify(pkg, null, 4))
        step = step + 1
        if (step < commands.length)
            doit(step);
    }
}, {
    msg: ">> Building local ui5", cmd: function (step) {
        exec("ui5 build", op);
    }
}, {
    msg: ">> Saving config", cmd: function (step) {
        exec("echo 'done' >> .localui5", op);
    }
}, {
    msg: ">> Running Locally...", cmd: function (step) {
        exec("ui5 serve", op);
    }
}]
function doit(step) {
    var element = commands[step]
    console.log(element.msg)

    element.cmd(step)
}
doit(step)





