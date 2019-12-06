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
const reqprom = require("request-promise-native");
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
            console.log("Please enter your Browser ");
            var browserInput = " ";
            browserInput = tl.getInput('browserName', true);
            if (browserInput == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            console.log('The Browser is', browserInput);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
        let options = { method: 'POST',
            uri: `https://crossbrowsertesting.com/api/v3/screenshots/`,
            json: true,
            body: {
                url: 'https://www.google.com',
                browsers: 'Pixel2-And90|MblChrome74|1080x1920',
            },
            auth: {
                username: userNameInput,
                password: authkeyInput
            }
        };
        var info = yield reqprom(options);
    });
}
run();
