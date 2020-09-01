# WoTnectivity KNX
A connection library for the KNX-IP protocol based on the knx.js library.


## Install WoTnectivity-knx

> :warning: **Requirements**: You need to have installed [node](https://nodejs.org/en/) and [npm](https://nodejs.org/en/).

The first thing you need to do is install wotnectivity-knx as a dependency in your project.

```console
foo@bar:~$ npm i wotnectivity-knx --save
```

Check if the `package.json` of your project contains the library as a depencency.

## Examples

In the next fragments of code you can see different use cases of `KNX` requests.

* Read a value from the group address 3/0/2.
  * `response`: value with the dataType declared.
```js
var Wotnectivity = require("wotnectivity-knx");
 
var address = "192.168.1.38";
var payload = 20;
var configuration = { requestType: "read", group: "3/0/2", dataType: "DPT5.001" };

Wotnectivity.sendRequest(address, configuration ,payload).then((data)=>{
    console.log(data)
});

```
* Write a value in the group address 3/0/2.
  * `response`: value with the dataType declared.
```js
var Wotnectivity = require("wotnectivity-knx");
 
var address = "192.168.1.38";
var payload = 20;
var configuration = { requestType: "write", group: "3/0/2", dataType: "DPT5.001" };

Wotnectivity.sendRequest(address, configuration ,payload).then((data)=>{
    console.log(data)
});
```
* Subscribe to the group address 3/0/3 to see the changes of the values in said address.
  * `response`: value with the dataType declared.
```js
var sub = await sendRequest("192.168.1.38", { requestType: "subscribe", group: "3/0/3", dataType: "DPT5.001" }, null)
  sub.subscribe((data) => {
    console.log(data);
  });
```

* Subscribe to multiple group addresses see the changes of the values in said addresses.
  * `response`:
    * `group`: the group address of the device firing the event.
    * `dataType`: the data type of the device firing the event.
    * `value`: the value corresponding to the group and data type.
```js
var sub = await sendRequest("192.168.1.38", { requestType: "subscribe", groups:[{group:"2/0/1", dataType: "DPT1.001"}, {group: "3/0/3", dataType: "DPT5.001"}]}, null)
  sub.subscribe((data) => {
    console.log(data);
  });
```
* Subscribe to the KNX buffer.
  * `response`:
    * `event`: detected event.
    * `src`: event origen physical address. 
    * `dest`: group address where the event happens. 
    * `value`: 
      * `type`: always type buffer because there is not a datatype declared.
      * `data`: raw data value of the particular event.
```js
var sub = await sendRequest("192.168.1.38", null, null)
  sub.subscribe((data) => {
    console.log(data);
  });
```

The configuration parameter of the request needs to have can have the following parameters: 

* `requestType` where the type of request will be declared. The request type can be of three different types:

    * `read`: Sends a request to read a value in the group address.
    * `write`: Write a value in the declared group address.
    * `subscribe`: Subscribes to the group address or adresses and gets all the data as an rxjs Observable paramenter, in the case of no groups in the request the library will try to subscribe to the knx bus for the requested address.

* (optional) `group`: Defines the group address of the particular interaction that we want to execute.

* (optional) `dataType`: Declares the data type of the group address. To see the compatible dataTypes please visit [knx.js DataPoints](https://bitbucket.org/ekarak/knx.js/src/master/README-datapoints.md).

* (optional) `groups`: An array of the groups and data types where you want to be subscribed.
  * `group`: Defines the group address of the particular interaction that we want to execute.
  * `dataType`: Declares the data type of the group address. To see the compatible dataTypes please visit [knx.js DataPoints](https://bitbucket.org/ekarak/knx.js/src/master/README-datapoints.md).




## Disclaimer

This library was developed with the [knx.js](https://bitbucket.org/ekarak/knx.js) as a base.