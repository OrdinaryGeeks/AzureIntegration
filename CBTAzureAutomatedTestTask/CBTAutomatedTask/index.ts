import tl = require('azure-pipelines-task-lib/task');
import webdriver = require('selenium-webdriver');
import request = require('request');


var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
import assert = require('assert');
import { AnyARecord } from 'dns';

interface MyType{

[key: string]: any
}


var caps: MyType;
 async function run() {
    try {
        console.log("Please enter your User Name");
        var userNameInput : string | undefined = "";
        userNameInput  = tl.getInput('username', true);
        if (userNameInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Username is ', userNameInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }

    try {
        console.log("Please enter your Authkey");
        var authkeyInput : string | undefined = "";
         authkeyInput  = tl.getInput('authkey', true);
        if (authkeyInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Authkey is', authkeyInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    try {
        console.log("Please enter the Operating System");
        var oSInput : string | undefined = "";
        oSInput  = tl.getInput('platform', true);
        if (oSInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Operating System (Platform) is', oSInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    try {
        console.log("Please enter your Screen Resolution");
        var screenResoInput : string | undefined = "";
        screenResoInput  = tl.getInput('screenResolution', true);
        if (screenResoInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Screen Resolution is', screenResoInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    try {
        console.log("Please enter your Browser Name");
        var browserInput : string | undefined = " ";
        browserInput  = tl.getInput('browserName', true);
        if (browserInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Browser Name is', browserInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    try {
        console.log("Please enter your Version");
        var versionInput : string | undefined = "";
        versionInput  = tl.getInput('version', true);
        if (versionInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Version is', versionInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }

    var Quote = "'";
    
     
    var caps : MyType;

    
    if(browserInput != undefined && userNameInput != undefined && versionInput != undefined && authkeyInput != undefined &&
        screenResoInput != undefined &&  oSInput != undefined)
        {
    caps = {'name': 'Azure Test 2',
    'build': '1.0',
    'browserName': (browserInput),
    'version': (versionInput),
    'platform' : (oSInput),
    'screenResolution' : (screenResoInput)
    //'username': Quote.concat(userNameInput.concat(Quote)),
   // 'authkey': Quote.concat(authkeyInput.concat(Quote))
    }
    caps.username =  (userNameInput);
    caps.password =  authkeyInput;
}
    else
    {
    caps = {}
console.log("In the else branch");
    }
    
                
var sessionId = null;
        //async function full(){

            try{
                console.log(caps.authkey);
                console.log(caps);
                 var driver =  new webdriver.Builder().usingServer(remoteHub).withCapabilities(caps).build();

                console.log('Waiting on the browser to be launched and the session to start');

              await   driver.getSession().then(function(session){

                   
                    sessionId =  session.getId(); //need for API calls
                    console.log('Session ID: ', sessionId); 
                    console.log('See your test run at: https://app.crossbrowsertesting.com/selenium/' + sessionId)
                });

                console.log("Before Url");

                    //load your URL
    await  driver.get('http://crossbrowsertesting.github.io/selenium_example_page.html');

     console.log("before title");
        //check title
       await  driver.getTitle().then(function(title){
            console.log('page title is ', title);
            assert.equal(title, 'Selenium Test Example Page');

        });

        console.log("before quit");
               //quit the driver
    await driver.quit()


               
            }

            catch(e){
                console.log('error');
            }




        }
        
//}

run();
