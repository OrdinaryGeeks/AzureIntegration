import tl = require('azure-pipelines-task-lib/task');
import reqprom = require('request-promise-native');
import requestPromise = require('request-promise-native');
import Controls = require('VSS/Controls');
import Combos = require("VSS/Controls/Combos");
/*var container = $(".sample-container");
var makeOptions = <Combos.IComboOptions>{
width: "400px",
source:
["Aston Martin", "Audi (3)", "Bentley", "BMW (2)", "Bugatti",
"Ferrari", "Ford", "Honda", "Hyundai", "Kia", "Lamborghini",
"Land Rover", "Lotus", "Maserati", "Mazda", "Mercedes",
"Mitsubishi", "Nissan", "Porsche", "Toyota", "Volkswagen", "Volvo"],
change: function () {

var selected = this.getText(this);
if (selected.indexOf("Audi") === 0) {
modelCombo.setSource(["A3", "A4", "Q7"]);
modelCombo.setMode("drop");
}
else if (selected.indexOf("BMW") === 0) {
modelCombo.setSource(["325", "X5"]);
modelCombo.setMode("drop");
}
else {
modelCombo.setMode("text");
}
modelCombo.setText("");
}
};
var modelOptions = <Combos.IComboOptions>{
width: "400px",
mode: "text"
};
// Make combo
$("<label />").text("Make:").appendTo(container);
Controls.create(Combos.Combo, container, makeOptions);
// Model combo
$("<label />").text("Model:").appendTo(container);
var modelCombo = Controls.create(Combos.Combo, container, modelOptions);
*/
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
        console.log("Please enter your Browser ");
        var browserInput : string | undefined = " ";
        browserInput  = tl.getInput('browserName', true);
        if (browserInput == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('The Browser is', browserInput);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    
    async function getBrowsers(){


    
        let options={ 
            method : 'GET',
    uri : `https://crossbrowsertesting.com/api/v3/screenshots/browsers`,
    json:true
    
     }
     var info = await requestprom(options);
    
    
    return info;
    
    
    
    
    }

   var browsersJson = getBrowsers();

    let options={ method : 'POST',
uri : `https://crossbrowsertesting.com/api/v3/screenshots/`,
json:true,
body:{
url:'https://www.google.com',
browsers: 'Pixel2-And90|MblChrome74|1080x1920',
},
auth:{
    username: userNameInput,
    password: authkeyInput
}
 }
 var info = await reqprom(options);
}

run();
