import{j as e,q as a,v as t,_ as l}from"./index.a302575e.js";/* empty css                *//* empty css                *//* empty css              *//* empty css               *//* empty css              *//* empty css               *//* empty css               */import{d as o,r,f as i,aH as s,D as n,aF as p,aJ as d,aO as u,H as c,aK as f,E as m,aL as g,u as x,aM as y,aP as v,b_ as b,bk as h,cd as _,c9 as S,bv as w,c2 as j,bl as z,bq as C,c3 as k,bz as I,cf as P,c5 as T,be as K}from"./arco.0e1801a1.js";import{u as O}from"./loading.4d3258a0.js";import{e as E,f as G,g as J}from"./enum.5f967a9b.js";function N(t){return e.get("/api/export/exportPlantGrid",{params:t,paramsSerializer:e=>a.stringify(e)})}function U(t){return e.get("/api/export/exportPlantPackageGridData",{params:t,paramsSerializer:e=>a.stringify(e)})}const V=l(o({__name:"export-list",setup(l,{expose:o}){const N=["","#7bc616","#165dff","#00b42a","#00b42a","#eb0aa4","f53f3f","f53f3f","#f53f3f","#f53f3f"],U={current:1,pageIndex:1,pageSize:30,defaultPageSize:30,pageSizeOptions:[10,30,50,100],total:0,defaultCurrent:1,page:1},V=r({...U}),{loading:q,setLoading:B}=O(!0);t.exports.useI18n(),i([]);const D=i({exportType:""});i({});const H=i([]),L=i([{colKey:"exportName",title:"报表名称",width:"180",align:"center"},{colKey:"exportStatus",title:"报表状态",width:"150",align:"center"},{colKey:"createdAt",title:"创建时间",width:"150",align:"center"},{colKey:"expiredTime",title:"过期时间",width:"150",align:"center"},{colKey:"exportType",title:"报表类型",width:"150",align:"center"},{colKey:"op",title:"操作",width:"100",align:"center"}]),M=async()=>{B(!0);try{const{data:l}=await(t={...D.value,...V},e.get("/api/export/exportGrid",{params:t,paramsSerializer:e=>a.stringify(e)}));V.total=l.total,H.value=l.grid||[]}catch(l){}finally{B(!1)}var t},A=()=>{M()},F=i(!1),Q=i([]);localStorage.getItem("report-hour-disPlayColumns")?Q.value=JSON.parse(localStorage.getItem("report-hour-disPlayColumns")):L.value.forEach((e=>{Q.value.push(e.colKey)}));const R=async e=>{localStorage.setItem("report-hour-disPlayColumns",JSON.stringify(e))},W=e=>{U.pageIndex=e.current,U.current=e.current,U.pageSize=e.pageSize,V.pageIndex=e.current,V.current=e.current,V.pageSize=e.pageSize,M()};o({showModel:()=>{F.value=!0,M()}});const X=()=>{F.value=!1},Y=()=>{F.value=!1};return(e,a)=>{const t=_,l=S,o=w,r=j,i=s("icon-search"),O=z,U=s("icon-refresh"),B=C,M=k,Z=I,$=P,ee=T,ae=s("t-table"),te=K;return n(),p(te,{visible:F.value,"onUpdate:visible":a[1]||(a[1]=e=>F.value=e),width:"80%",onOk:X,onCancel:Y},{title:d((()=>[u(" 报表详情 ")])),default:d((()=>[c("div",null,[f(M,null,{default:d((()=>[f(r,{flex:1},{default:d((()=>[f(Z,{model:D.value},{default:d((()=>[f(M,{gutter:16},{default:d((()=>[f(r,{span:8},{default:d((()=>[f(o,{field:"exportType",label:"报表类型"},{default:d((()=>[f(l,{modelValue:D.value.exportType,"onUpdate:modelValue":a[0]||(a[0]=e=>D.value.exportType=e)},{default:d((()=>[f(t,{label:"全部",value:""}),(n(!0),m(y,null,g(x(E)(x(G)),((e,a)=>(n(),p(t,{key:a,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),f(r,{span:8},{default:d((()=>[f(B,{size:18},{default:d((()=>[f(O,{type:"primary",onClick:A},{icon:d((()=>[f(i)])),default:d((()=>[u(" 搜索 ")])),_:1}),f(O,{type:"primary",onClick:A},{icon:d((()=>[f(U)])),default:d((()=>[u(" 刷新 ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1})])),_:1}),f($,{style:{"margin-top":"8px"}}),f(ae,{"row-key":"plantId",data:H.value,columns:L.value,loading:x(q),pagination:V,bordered:!0,"table-layout":"fixed","default-display-columns":Q.value,"on-display-columns-change":R,onPageChange:W},{exportStatus:d((({row:e})=>[f(ee,{color:N[e.exportStatus]},{default:d((()=>[u(v(x(J)[e.exportStatus]||"-"),1)])),_:2},1032,["color"])])),exportType:d((({row:e})=>[u(v(x(G)[e.exportType]||"-"),1)])),op:d((({row:e})=>[f(O,{type:"text",class:"searchBtn",onClick:a=>(e=>{switch(e.exportStatus){case 1:h.info("报表生成中");break;case 2:if(b().isBefore(b(e.expiredTime))){const a=document.createElement("a");a.style.display="none",a.href=e.exportUrl,document.body.appendChild(a),a.click(),document.body.removeChild(a)}else h.info("文件已过期，无法下载")}})(e)},{default:d((()=>[u(" 下载报表 ")])),_:2},1032,["onClick"])])),_:1},8,["data","columns","loading","pagination","default-display-columns"])])])),_:1},8,["visible"])}}}),[["__scopeId","data-v-fb6fcab2"]]);export{V as E,U as a,N as e};
