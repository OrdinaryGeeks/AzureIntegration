import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        console.log("Please enter your User Name");
        var usernameInput  = tl.getInput('username', true);
        if (usernameInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Username is ', usernameInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }

    try {
        console.log("Please enter your Authkey");
        var authkeyInput  = tl.getInput('authkey', true);
        if (authkeyInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Authkey is', authkeyInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
