import{j as a,q as e}from"./index.a302575e.js";function i(i){return a.get("/api/channels-aide/getQrcodeStatus",{params:i,paramsSerializer:a=>e.stringify(a)})}function r(i,r){return i.isAdd=r||!1,a.get("/api/channels-aide/getQrcode",{params:i,paramsSerializer:a=>e.stringify(a)})}function n(i){return a.get("/api/channels-aide/sphGrid",{params:i,paramsSerializer:a=>e.stringify(a)})}function s(e){return a.post("/api/channels-aide/sphEdit",e)}function t(e){return a.post("/api/channels-aide/deleteSphBind",e)}function p(i){return a.get("/api/channels-aide/describeTempGrid",{params:i,paramsSerializer:a=>e.stringify(a)})}function c(e){return a.post("/api/channels-aide/describeTempEdit",e)}function d(e){return a.post("/api/channels-aide/describeTempDel",e)}function o(e){return a.post("/api/channels-aide/describeTempAdd",e)}function u(i){return a.get("/api/channels-aide/aideVideoTaskGrid",{params:i,paramsSerializer:a=>e.stringify(a)})}function l(i){return a.get("/api/channels-aide/aideVideoTaskInfoGrid",{params:i,paramsSerializer:a=>e.stringify(a)})}function f(e){return a.post("/api/channels-aide/aideVideoTaskAdd",e)}function m(i){return a.get("/api/info",{params:i,paramsSerializer:a=>e.stringify(a),baseURL:"http://localhost:15076"})}function h(i){return a.get("/api/openFiles",{params:i,paramsSerializer:a=>e.stringify(a),baseURL:"http://localhost:15076"})}function g(e){return a.post("/api/upload",e,{baseURL:"http://localhost:15076"})}function S(i){return a.get("/api/channels-aide/getAllProduct",{params:i,paramsSerializer:a=>e.stringify(a)})}function y(i){return a.get("/api/channels-aide/checkProduct",{params:i,paramsSerializer:a=>e.stringify(a)})}export{m as E,i as a,s as b,p as c,t as d,o as e,c as f,r as g,d as h,S as i,f as j,g as k,y as l,l as m,u as n,h as o,n as s};
