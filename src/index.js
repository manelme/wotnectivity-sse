var knx = require('knx');
var rxjs = require('rxjs');

async function sendRequest(address, configuration, payload) {
  try {
    var connection;
    if (address) {
      if (configuration.requestType == "read") {
        return new Promise((resolve, reject) => {
          connection = knx.Connection({
            ipAddr: address,
            handlers: {
              connected: () => {
                readRequest(connection, configuration).then(data => {
                  resolve(data)
                  connection.Disconnect()
                }).catch((error) => {
                  reject(error)
                  connection.Disconnect()
                })
              }
            }
          })
        })

      }
      else if (configuration.requestType == "write") {
        return new Promise((resolve, reject) => {
          connection = knx.Connection({
            ipAddr: address,
            handlers: {
              connected: () => {
                writeRequest(connection, configuration, payload).then(data => {
                  resolve(data)
                  connection.Disconnect()
                }).catch((error) => {
                  reject(error)
                  connection.Disconnect()
                })
              }
            }
          })
        })
      }
      else if (configuration.requestType == "subscribe") {
        return new Promise((resolve) => {
          connection = knx.Connection({
            ipAddr: address,
            handlers: {
              connected: () => {
                resolve(subscribeRequest(connection, configuration));
              }
            }
          })
        })
      }
    }
  } catch (error) {
    console.log(error);
  }

}

async function readRequest(connection, configuration) {
  return new Promise((resolve, reject) => {
    try {
      var dp = new knx.Datapoint({
        ga: configuration.group,
        dpt: configuration.dataType
      }, connection);
      dp.read((src, value) => {
        resolve(value);
      });
    } catch (error) {
      reject(error);
    }
  })
}

async function writeRequest(connection, configuration, payload) {
  return new Promise((resolve, reject) => {
    try {
      var dp = new knx.Datapoint({
        ga: configuration.group,
        dpt: configuration.dataType
      }, connection);
      dp.write(payload);
      dp.read((src, value) => {
        resolve(value)
      })
    } catch (error) {
      reject(error);
    }
  })
}

function subscribeRequest(connection, configuration) {
  return rxjs.Observable.create((data) => {
    try {
      var dp = new knx.Datapoint({
        ga: configuration.group,
        dpt: configuration.dataType
      }, connection)
      dp.on('change', (oldValue, newValue) => {
        data.next(newValue);
      })
    } catch (error) {
      console.log(error)
    }
  })

}

module.exports.sendRequest = sendRequest