const express = require("express");
const proxy = require("express-http-proxy");

module.exports = proxyEndpoint => {
  console.log(proxyEndpoint);
  return proxy(proxyEndpoint, {
    preserveHostHdr: true,
    limit: "30mb",
    proxyReqOptDecorator(proxyReqOpts, originalReq) {
      const updatedProxyOpts = proxyReqOpts;
      updatedProxyOpts.headers.user = JSON.stringify(originalReq.user);

      //  Sample mechanism to pass additional custom headers to the microservices
      //  if (
      //     originalReq.user &&
      //     originalReq.user.user_details &&
      //     originalReq.user.user_details.user_id
      //   ) {
      //     updatedProxyOpts.headers["X-UserId"] =
      //       originalReq.user.user_details.user_id;
      //   }
      return proxyReqOpts;
    },
    proxyReqPathResolver(req) {
      return req.url;
    },
    userResHeaderDecorator(headers) {
      // recieves an Object of headers, returns an Object of headers.
      return headers;
    }
  });
};
