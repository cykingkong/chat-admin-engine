import{ah as a,ai as t}from"./index.f3be9d6e.js";function n(r){return a.post("/api/pay/createOrder",r)}function s(r){return a.get("/api/pay/codeCheck",{params:r,paramsSerializer:e=>t.stringify(e)})}function o(r){return a.post("/api/pay/orderList",r)}function p(r){return a.get("/api/pay/getOrderPayStatus",{params:r,paramsSerializer:e=>t.stringify(e)})}export{s as a,n as c,p as g,o};
