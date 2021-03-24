const http = require('http');
const https = require('https');
var rxjs = require('rxjs');


async function sendRequest(address, configuration, payload) {
  try {
    if (address) {
      if (!configuration || configuration.requestType == "SSE") {
        return new Promise((resolve, reject) => {
          resolve(subscribeRequest(address, configuration))
        }).catch((error) => {
          console.log(error);
          reject(error);
        })
      }
    }
} 
catch (error) {
  console.log(error);
}
}

async function init() {
  let response = await sendRequest("http://192.168.1.21/property/status/sse", {
    requestType: "SSE"
  })
  response.subscribe((data)=>{
    console.log(data)
  })
}

function subscribeRequest(address, configuration) {
  return rxjs.Observable.create((data) => {
    try {
      if(address.substring(0,5)=="https"){
        https.get(address, configuration.headers, (resp) => {
          let data2 = '';
          // A chunk of data has been received.
          resp.on('data', (chunk) => {
            data2 += chunk.toString();
            if (data2.includes("\n")){
              data.next(data2.split("\n")[0])
              data2 = "";
            }
          });
  
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            
          });
  
        })
      }else{
        http.get(address, configuration.headers, (resp) => {
          let data2 = '';
          // A chunk of data has been received.
          resp.on('data', (chunk) => {
            data2 += chunk.toString();
            if (data2.includes("\n")){
              data.next(data2.split("\n")[0])
              data2 = "";
            }
          });
  
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            
          });
  
        })
      }
      
        
      
    } catch (error) {
      console.log(error)
    }
    
    
  })

}

init()

module.exports.sendRequest = sendRequest