const requestprom = require('request-promise-native');



async function getBrowsers(){


    
    let options={ 
        method : 'GET',
uri : `https://crossbrowsertesting.com/api/v3/screenshots/browsers`,
json:true

 }
 var info = await requestprom(options);


return info;




}