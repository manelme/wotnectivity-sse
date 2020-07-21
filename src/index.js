var knx = require('knx');
var rxjs = require('rxjs');

var connection;


async function sendRequest(address, configuration, payload) {
  if (address) {
    if (configuration.requestType == "read") {
      return new Promise((resolve, reject) => {
        this.connection = knx.Connection({
          ipAddr: address,
          handlers: {
            connected: () => {
              readRequest(configuration).then(data => {
                resolve(data)
              }).catch((error) => {
                reject(error)
              })
            }
          }
        })
      })

    }
    else if (configuration.requestType == "write") {
      return new Promise((resolve, reject) => {
        this.connection = knx.Connection({
          ipAddr: address,
          handlers: {
            connected: () => {
              writeRequest(configuration, payload).then(data => {
                resolve(data)
              }).catch((error) => {
                reject(error)
              })
            }
          }
        })
      })
    }
    else if (configuration.requestType == "subscribe") {
      return new Promise((resolve) => {
        this.connection = knx.Connection({
          ipAddr: address,
          handlers: {
            connected: () => {
              resolve(subscribeRequest(configuration));
            }
          }
        })
      })
    }
  }

  async function readRequest(configuration) {
    return new Promise((resolve, reject) => {
      try {
        var dp = new knx.Datapoint({
          ga: configuration.group,
          dpt: configuration.dataType
        }, this.connection);
        dp.read((src, value) => {
          resolve(value);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  async function writeRequest(configuration, payload) {
    return new Promise((resolve, reject) => {
      try {
        var dp = new knx.Datapoint({
          ga: configuration.group,
          dpt: configuration.dataType
        }, this.connection);
        dp.write(payload);
        dp.read((src, value) => {
          resolve(value)
        })
      } catch (error) {
        reject(error);
      }
    })
  }

  function subscribeRequest(configuration) {
    return rxjs.Observable.create((data) => {
      try {
        var dp = new knx.Datapoint({
          ga: configuration.group,
          dpt: configuration.dataType
        }, this.connection)
        dp.on('change', (oldValue, newValue) => {
          data.next(newValue);
        })
      } catch (error) {
        console.log(error)
      }
    })

  }
}


async function testRead() {
  var hola = await sendRequest("192.168.1.33", { requestType: "read", group: "2/0/1", dataType: "DPT1.001" }, null);
}
async function testWrite() {
  var hola = await sendRequest("192.168.1.33", { requestType: "write", group: "2/0/0", dataType: "DPT1.001" }, true);
  console.log(hola)
}

async function testSubscribe() {
  var hola = await sendRequest("192.168.1.33", { requestType: "subscribe", group: "2/0/0", dataType: "DPT1.001" }, null)
  hola.subscribe((data) => {
    console.log(data);
  });
}

testSubscribe()