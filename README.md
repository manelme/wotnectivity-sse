# WoTnectivity SSE
A connection library for the SSE based requests. This library works with `text/event-streams` delimited by `\n` and also with `application/nd-json` as `content-type:`  of the requests.


## Install WoTnectivity-SSE

> :warning: **Requirements**: You need to have installed [node](https://nodejs.org/en/) and [npm](https://nodejs.org/en/).

The first thing you need to do is install wotnectivity-sse as a dependency in your project.

```console
foo@bar:~$ npm i wotnectivity-sse --save
```

Check if the `package.json` of your project contains the library as a depencency.

## Examples

In the next fragments of code you can see different use cases of `SSE` requests.


* Read a value from the address with a GET petition.
  * `response`: reponse from the server.
```js
var Wotnectivity = require("wotnectivity-sse");
 
var address = "http://192.168.1.38";
var payload = {};
var configuration = { requestType: "SSE", headers: {content-type:"application/json"}};

let response = await Wotnectivity.sendRequest("http://192.168.1.21/property/status/sse", configuration, payload)
  response.subscribe((data)=>{
    console.log(data)
  })
```

The configuration parameter of the request needs to have can have the following parameters: 

* `requestType` where the type of request will be declared. The request type can be of three different types:

    * `SSE`: Sends a SSE request to an address.

* (optional) `headers`: Defines the headers of the request.

The library works over http and https.