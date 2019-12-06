"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const webdriver = require("selenium-webdriver");
var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
const assert = require("assert");
var caps;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Please enter your User Name");
            var userNameInput = "";
            userNameInput = tl.getInput('username', true);
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
            var authkeyInput = "";
            authkeyInput = tl.getInput('authkey', true);
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
            var oSInput = "";
            oSInput = tl.getInput('platform', true);
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
            var screenResoInput = "";
            screenResoInput = tl.getInput('screenResolution', true);
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
            var browserInput = " ";
            browserInput = tl.getInput('browserName', true);
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
            var versionInput = "";
            versionInput = tl.getInput('version', true);
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
        var caps;
        if (browserInput != undefined && userNameInput != undefined && versionInput != undefined && authkeyInput != undefined &&
            screenResoInput != undefined && oSInput != undefined) {
            caps = { 'name': 'Azure Test 2',
                'build': '1.0',
                'browserName': (browserInput),
                'version': (versionInput),
                'platform': (oSInput),
                'screenResolution': (screenResoInput)
                //'username': Quote.concat(userNameInput.concat(Quote)),
                // 'authkey': Quote.concat(authkeyInput.concat(Quote))
            };
            caps.username = (userNameInput);
            caps.password = authkeyInput;
        }
        else {
            caps = {};
            console.log("In the else branch");
        }
        var sessionId = null;
        //async function full(){
        try {
            console.log(caps.authkey);
            console.log(caps);
            var driver = new webdriver.Builder().usingServer(remoteHub).withCapabilities(caps).build();
            console.log('Waiting on the browser to be launched and the session to start');
            yield driver.getSession().then(function (session) {
                sessionId = session.getId(); //need for API calls
                console.log('Session ID: ', sessionId);
                console.log('See your test run at: https://app.crossbrowsertesting.com/selenium/' + sessionId);
            });
            console.log("Before Url");
            //load your URL
            yield driver.get('http://crossbrowsertesting.github.io/selenium_example_page.html');
            console.log("before title");
            //check title
            yield driver.getTitle().then(function (title) {
                console.log('page title is ', title);
                assert.equal(title, 'Selenium Test Example Page');
            });
            console.log("before quit");
            //quit the driver
            yield driver.quit();
        }
        catch (e) {
            console.log('error');
        }
    });
}
//}
run();
