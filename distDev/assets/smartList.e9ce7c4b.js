import{d as le,r as a,g as ue,al as N,f as ne,v as ce,i as B,$ as ie,j as c,o as g,a as h,n as o,m as l,e as n,u as T,q as d,t as p,F as re,k as de,l as $,s as pe,aS as _e,aT as ge,aU as me,p as fe,b as ve,N as P,aV as he,_ as be}from"./index.f3be9d6e.js";import{u as ye}from"./loading.b87f2d78.js";import{Q as Fe}from"./qrcode.vue.esm.65579910.js";import{A as Ce}from"./enum.5f967a9b.js";import"./copy.b765ae4e.js";const b=m=>(fe("data-v-955c6f21"),m=m(),ve(),m),Ee={class:"container"},xe=b(()=>n("div",{class:"upai_pageTitle"}," \u667A\u80FD\u76D1\u63A7 ",-1)),Ie={class:"upai_content_outsideBox"},we={class:"pagination"},Be=b(()=>n("div",null,null,-1)),ke={class:"upai_content_outsideBox"},De=b(()=>n("div",{class:"upai_titleLi",style:{"margin-bottom":"22px"}},[n("span",{class:"borderLeft"}),d(" \u63D0\u793A\u6D88\u606F\u914D\u7F6E ")],-1)),Se={class:"upai_content_outsideBox"},Me=b(()=>n("div",{class:"upai_titleLi"},[n("span",{class:"borderLeft"}),d(" \u516C\u4F17\u53F7\u63D0\u9192 ")],-1)),ze={class:"qrcodeBorder"},Ae=le({__name:"smartList",setup(m){const y=a("");a("");const j=ue();console.log(j.$state,"userStore");const k=a(""),G=a(""),_=a();N().then(e=>{G.value=e.data.shareLink,k.value=e.data.authKey,_.value=e.data.userInfo.gzhMsgSwitch,console.log(e,_.value)});const Q=()=>({}),q=()=>new Promise(e=>{_e().then(s=>{e(s.data)})}),H={};ne(),a(!1),a(!1),a([]),a(!1),a(!1),a([]),a(""),a(!1),a(),a(0),a(0),a("\u4FEE\u6539\u4FE1\u606F"),a((()=>({id:void 0,sphType:0,sphRemark:"",type:1}))()),q().then(e=>{console.log(e.url),y.value=e.url}),a({remark:"\u5907\u6CE8"});const{loading:O,setLoading:D}=ye(!0);ce.exports.useI18n();const S=a([]),F=a(Q());a("");const r={current:1,pageIndex:1,pageSize:10},i=B({...r});B({...r});const C=a([]),E=B([{title:"\u8D26\u53F7\u79BB\u7EBF\u901A\u77E5",Key:"1",k:"0",select:!1,disabled:!0},{title:"\u5546\u54C1\u7206\u5355\u901A\u77E5",Key:"2",k:"0",select:!1,disabled:!0},{title:"\u8BA1\u5212\u5173\u505C\u901A\u77E5",Key:"3",k:"0",select:!1,disabled:!0},{title:"\u5F02\u5E38\u5173\u505C\u901A\u77E5",Key:"4",k:"0",select:!1,disabled:!0}]),M=a(),R=a(),f=async()=>{const{data:e}=await N();k.value=e.authKey,_.value=e.userInfo.gzhMsgSwitch,M.value=e.levelName,R.value=e.userInfo.memberDepId,C.value=e.userInfo.memberDepId?e.userInfo.memberMsg.split(","):e.memberMsg.split(",")||[];const s=e.levelMemberMsg.split(",")||[];E.forEach((u,I)=>{u.k=C.value.includes(`${u.Key}`)?e.memberMsg[I]:0,u.select=C.value.includes(`${u.Key}`),s.length&&s.forEach(w=>{w===u.Key&&(u.disabled=!1)})})},Z=async()=>{const e=[];E.forEach(s=>{s.select&&e.push(s.Key)}),console.log(e),await he({memberMsg:e.join(",")})},J=async()=>{const{data:e}=await ge({gzhMsgSwitch:_.value});e&&f()};f();const x=async e=>{D(!0);try{const{data:s}=await me(e);S.value=s.grid.map(u=>(u.memberDepId===0&&(u.deptName="-"),u)),i.current=e.pageIndex,i.pageIndex=e.pageIndex,i.total=s.total}catch{}finally{D(!1)}},z=e=>{r.pageIndex=e,r.current=e,i.pageIndex=e,i.current=e,x({...F.value,...r})},W=e=>{r.pageSize=e,i.pageSize=e,x({...F.value,...r})},X=e=>{console.log(e),e||setTimeout(()=>{f()},200)};x({...F.value,...r}),a(!1);const A=a(null);return a(0),ie(()=>{clearInterval(A.value),A.value=null}),a(),(e,s)=>{const u=c("a-table-column"),I=c("a-tag"),w=c("a-typography-paragraph"),Y=c("a-table"),ee=c("a-pagination"),v=c("a-col"),te=c("a-tooltip"),V=c("a-switch"),U=c("a-popconfirm"),L=c("a-row"),ae=c("a-button"),K=c("a-space");return g(),h("div",Ee,[xe,o(L,{gutter:24,align:"start"},{default:l(()=>[o(v,{flex:"auto"},{default:l(()=>[n("div",Ie,[o(Y,{"row-key":"id",pagination:!1,loading:T(O),data:S.value,scroll:H,hoverable:!0,stripe:!1,bordered:!1,onPageChange:z},{columns:l(()=>[o(u,{title:"\u64CD\u4F5C\u4EBA",align:"center"},{cell:l(({record:t})=>[d(p(t.memberUserInfo?t.memberUserInfo.memberAccount:"-"),1)]),_:1}),o(u,{title:"\u6240\u5C5E\u90E8\u95E8",align:"center"},{cell:l(({record:t})=>[d(p(t.deptName?t.deptName:"-"),1)]),_:1}),o(u,{title:"\u64CD\u4F5C\u7C7B\u578B",align:"center"},{cell:l(({record:t})=>[o(I,{color:"arcoblue"},{default:l(()=>[d(p(t.logType?T(Ce)[t.logType]:"-"),1)]),_:2},1024)]),_:1}),o(u,{title:"\u64CD\u4F5C\u8BE6\u60C5",align:"center",width:"200"},{cell:l(({record:t})=>[o(w,{ellipsis:{rows:1,showTooltip:!0},style:{"margin-bottom":"0"}},{default:l(()=>[d(p(t.logMsg?t.logMsg:"-"),1)]),_:2},1024)]),_:1}),o(u,{title:"\u64CD\u4F5C\u65F6\u95F4",align:"center"},{cell:l(({record:t})=>[d(p(t.createdAt?t.createdAt:"-"),1)]),_:1})]),_:1},8,["loading","data"]),n("div",we,[Be,n("div",null,[o(ee,{current:i.pageIndex,"onUpdate:current":s[0]||(s[0]=t=>i.pageIndex=t),"page-size":i.pageSize,"onUpdate:pageSize":s[1]||(s[1]=t=>i.pageSize=t),total:Number(i.total),"show-total":!0,"show-page-size":!0,"page-size-options":[10,20,50,100,200],onChange:z,onPageSizeChange:W},null,8,["current","page-size","total"])])])])]),_:1}),o(v,{flex:"239px"},{default:l(()=>[o(K,{direction:"vertical",size:24,style:{width:"100%"}},{default:l(()=>[n("div",ke,[De,(g(!0),h(re,null,de(E,(t,oe)=>(g(),h("div",{key:oe,class:"switchBox"},[t.disabled?(g(),$(te,{key:0,content:`${M.value}\u65E0\u5F00\u542F\u6743\u9650\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\u5347\u7EA7`},{default:l(()=>[n("div",{class:"label",style:P({color:t.disabled?"#777":"#000"})},p(t.title),5)]),_:2},1032,["content"])):(g(),h("div",{key:1,class:"label",style:P({color:t.disabled?"#777":"#000"})},p(t.title),5)),o(U,{content:`\u786E\u8BA4\u662F\u5426\u4FEE\u6539${t.title}\u72B6\u6001`,onOk:Z,onCancel:s[2]||(s[2]=()=>{console.log("\u6CA1\u6709\u4FEE\u6539")}),onPopupVisibleChange:X},{default:l(()=>[o(V,{modelValue:t.select,"onUpdate:modelValue":se=>t.select=se,disabled:t.disabled,"checked-value":!0,"unchecked-value":!1},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:2},1032,["content"])]))),128))]),n("div",Se,[o(L,{justify:"space-between",align:"center",style:{"margin-bottom":"22px"}},{default:l(()=>[o(v,{flex:"90px"},{default:l(()=>[Me]),_:1}),o(v,{flex:"40px"},{default:l(()=>[o(U,{content:"\u786E\u8BA4\u662F\u5426\u5173\u95ED\u516C\u4F17\u53F7\u63D0\u9192",onOk:J,onCancel:f},{default:l(()=>[o(V,{modelValue:_.value,"onUpdate:modelValue":s[3]||(s[3]=t=>_.value=t),"checked-value":1,"unchecked-value":0},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),o(K,{style:{width:"100%"},direction:"vertical",align:"center"},{default:l(()=>[n("div",ze,[y.value?(g(),$(Fe,{key:0,value:y.value,size:140,level:"H"},null,8,["value"])):pe("",!0)]),o(ae,{type:"primary",size:"small"},{default:l(()=>[d(" \u626B\u7801\u5173\u6CE8 \u5F00\u542F\u516C\u4F17\u53F7\u63D0\u9192 ")]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1})])}}});const $e=be(Ae,[["__scopeId","data-v-955c6f21"]]);export{$e as default};
