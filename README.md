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
```js
var sub = await sendRequest("192.168.1.38", { requestType: "subscribe", group: "3/0/3", dataType: "DPT5.001" }, null)
  sub.subscribe((data) => {
    console.log(data);
  });
```

The configuration parameter of the request needs to have at least three parameters: 

* `requestType` where the type of request will be declared. The request type can be of three different types:

    * `read`: Sends a request to read a value in the group address.
    * `write`: Write a value in the declared group address.
    * `subscribe`: Subscribes to the group address and gets all the data as an rxjs Observable paramenter.

* `group`: Defines the group address of the particular interaction that we want to execute.

* `dataType`: Declares the data type of the group address. To see the compatible dataTypes please visit [knx.js DataPoints](https://bitbucket.org/ekarak/knx.js/src/master/README-datapoints.md).


## Disclaimer

This library was developed with the [knx.js](https://bitbucket.org/ekarak/knx.js) as a base.