import{d as Z,v as me,c as ye,o as v,a as $,p as pe,b as ve,e as c,_ as ee,u as T,r as d,f as Ee,g as Pe,h as Ve,i as Y,w as xe,j as w,F as Ae,k as $e,t as P,l as F,m as a,n as s,q as y,s as B,x as O,M as f,y as H,z as de,A as qe,B as Se}from"./index.f3be9d6e.js";import{F as De}from"./index.0570e962.js";import{u as Ie}from"./loading.b87f2d78.js";const _e=p=>(pe("data-v-cbfb7a48"),p=p(),ve(),p),Le={class:"banner"},Te=_e(()=>c("div",{class:"midImg"},[c("img",{src:"https://img.adyinqing.com/upai_shop/d57ook4m1689572521358",alt:""})],-1)),Ue=_e(()=>c("div",{class:"logo"},[c("img",{src:"https://img.adyinqing.com/upai_shop/3h1sxrv71689912194354",alt:""})],-1)),ze=[Te,Ue],Re=Z({__name:"banner",setup(p){return me.exports.useI18n(),ye(()=>[]),(_,h)=>(v(),$("div",Le,ze))}});const je=ee(Re,[["__scopeId","data-v-cbfb7a48"]]),Me={style:{width:"324px"}},Ne=["data-site-key"],Oe={created(){const p=this;this.dynamicLoadJs("//captcha.luosimao.com/static/js/api.js"),window.getResponse=_=>{const h=document.getElementsByName("luotest_response");h.length===1&&h[0].value===_?p.$emit("success",_):LUOCAPTCHA&&LUOCAPTCHA.reset()}},methods:{dynamicLoadJs(p,_){return new Promise((h,V)=>{const b=document.createElement("script");b.type="text/javascript",b.src=p,b.onload=()=>{h()},b.onerror=()=>{V(new Error(`Failed to load script: ${p}`))},document.head.appendChild(b)})}}},ce=Object.assign(Oe,{__name:"NC",setup(p){const _="5ce8365da072d5a37b35b9b9b2dcfe5b";return(h,V)=>(v(),$("div",Me,[c("div",{class:"l-captcha","data-site-key":T(_),"data-width":"324","data-callback":"getResponse",style:{width:"324px"}},null,8,Ne)]))}}),ue=p=>(pe("data-v-45398901"),p=p(),ve(),p),He={class:"login-form-wrapper"},Je={class:"login-form-title"},Qe={class:"titleFlexBox"},We=["onClick"],Ge={class:"login-form-error-msg"},Ke={class:"login-form-password-actions"},Xe={style:{color:"#0c2963"}},Ye=ue(()=>c("img",{src:"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702",alt:"",class:"icon"},null,-1)),Ze=["src"],eu={class:"login-form-password-actions"},uu=ue(()=>c("div",{class:""},null,-1)),ou=ue(()=>c("img",{src:"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702",alt:"",class:"icon"},null,-1)),su=["src"],au=Z({__name:"login-form",setup(p){const _=d(0),h=d(!1),V=d(!1),b=d(!1),J=d(!1),U=d(!0),Q=d(!0),q=Ee(),{t:ge}=me.exports.useI18n(),oe=d(""),{loading:z,setLoading:se}=Ie(),ae=Pe(),S=d(["\u5BC6\u7801\u767B\u5F55","\u9A8C\u8BC1\u7801\u767B\u5F55"]),r=d(1);d("\u767B\u5F55");const x=d("\u6CE8\u518C"),fe=d("\u5DF2\u6709\u8D26\u53F7"),C=Ve("login-config",{rememberPassword:!0,username:null,password:null}),k=d("\u83B7\u53D6\u624B\u673A\u9A8C\u8BC1\u7801");d("\u83B7\u53D6\u56FE\u7247\u9A8C\u8BC1\u7801"),d("");const R=d(60),j=d(!1),i=Y({phone:"",verificationCode:"",memberPassword:"",memberPasswordCheck:"",token:""}),o=Y({phone:"",verificationCode:"",memberPassword:"",memberPasswordCheck:"",token:""}),E=Y({username:C.value.username,password:C.value.password}),he=()=>{r.value=4,x.value="\u4FEE\u6539\u5BC6\u7801",o.phone="",o.verificationCode="",o.memberPassword="",o.memberPasswordCheck="",o.token=""},te=d();function m(u){let e=new RegExp(`(^|&)${u}=([^&]*)(&|$)`,"i");console.log(window);let l=window.location.href.substr(1).match(e),n="";return l!=null&&(n=decodeURIComponent(l[2])),e=null,l=null,n==null||n==""||n=="undefined"?"":n}console.log(m("auth_code")),console.log(m("auth_key")),xe(r,(u,e)=>{console.log(r.value),r.value<=2?S.value=["\u5BC6\u7801\u767B\u5F55","\u9A8C\u8BC1\u7801\u767B\u5F55"]:r.value===3?S.value=["\u6CE8\u518C"]:r.value===4&&(S.value=["\u5FD8\u8BB0\u5BC6\u7801"])});const Ce=()=>{r.value=1,_.value=0,console.log(o,"toLogin")},Fe=u=>{r.value<=2&&(_.value=u,r.value=u?2:1,x.value="\u767B\u5F55")};if((u=>new Promise((e,l)=>{const n=document.createElement("script");n.type="text/javascript",n.src=u,n.onload=()=>{e()},n.onerror=()=>{l(new Error(`Failed to load script: ${u}`))},document.head.appendChild(n)}))("//captcha.luosimao.com/static/js/api.js"),m("auth_key")&&(S.value=["\u6CE8\u518C"],r.value=3),m("auth_code")){te.value=m("auth_code"),ae.SSOLogin(te.value),localStorage.setItem("waitReload","1");const{redirect:u,...e}=q.currentRoute.value.query;q.push({name:u||"Workplace",query:{...e}})}function W(){i.token="",o.token="",LUOCAPTCHA&&LUOCAPTCHA.reset()}const D=()=>{R.value===0?(k.value="\u83B7\u53D6\u624B\u673A\u9A8C\u8BC1\u7801",j.value=!1,W(),I.value=!1):(R.value--,k.value=`${R.value}s\u540E\u91CD\u65B0\u53D1\u9001`,j.value=!0),setTimeout(()=>{D()},1e3)},M=u=>{if(u==="logon"){h.value||(h.value=!0);const e=i.memberPasswordCheck.trim(),l=i.memberPassword.trim();console.log(e,l),e===l?U.value=!0:U.value=!1}else if(u==="edit"){V.value||(V.value=!0);const e=o.memberPasswordCheck.trim(),l=o.memberPassword.trim();Q.value=e===l}},ne=u=>{u==="logon"?(b.value||(b.value=!0),i.memberPasswordCheck.trim()&&M(u)):u==="edit"&&(J.value||(J.value=!0),o.memberPasswordCheck.trim()&&M(u))},I=d(!1),Be=async()=>{if(!i.phone){f.info("\u8BF7\u5148\u8F93\u5165\u624B\u673A\u53F7\u7801");return}if(!/^1[3456789]\d{9}$/.test(i.phone)){f.info("\u624B\u673A\u53F7\u7801\u6709\u8BEF\uFF0C\u8BF7\u91CD\u586B");return}i.token&&H({tel:i.phone,token:i.token}).then(({data:u})=>{u&&(f.success("\u53D1\u9001\u9A8C\u8BC1\u7801\u6210\u529F\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536"),k.value="",D())}).catch(u=>{W()}),I.value=!0},be=async()=>{if(!o.phone){f.info("\u8BF7\u5148\u8F93\u5165\u624B\u673A\u53F7\u7801");return}if(!/^1[3456789]\d{9}$/.test(o.phone)){f.info("\u624B\u673A\u53F7\u7801\u6709\u8BEF\uFF0C\u8BF7\u91CD\u586B");return}o.token&&H({tel:o.phone,token:o.token,resetPassword:!0}).then(({data:u})=>{u&&(f.success("\u53D1\u9001\u9A8C\u8BC1\u7801\u6210\u529F\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536"),k.value="",D())}).catch(u=>{W()}),I.value=!0};async function le(u){if(R.value=60,r.value===4){o.token=u;const{data:l}=await H({tel:o.phone,token:o.token,resetPassword:!0});l&&(f.success("\u53D1\u9001\u9A8C\u8BC1\u7801\u6210\u529F\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536"),k.value="",D());return}i.token=u;const{data:e}=await H({tel:i.phone,token:i.token});e&&(f.success("\u53D1\u9001\u9A8C\u8BC1\u7801\u6210\u529F\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536"),k.value="",D())}const we=async({errors:u})=>{if(!u){if(!Q.value){f.error("\u8BF7\u786E\u8BA4\u4E24\u6B21\u5BC6\u7801\u65E0\u8BEF");return}const e={tel:o.phone,code:o.verificationCode,memberPassword:o.memberPassword},{data:l,code:n}=await de(e);n===200&&(f.success("\u4FEE\u6539\u5BC6\u7801\u6210\u529F"),C.value.password=o.memberPassword,C.value.username=o.phone,E.username=C.value.username,E.password=C.value.password,r.value=1)}},re=async({errors:u,values:e})=>{if(!z.value&&!u){se(!0);try{if(r.value===1){await ae.login(e);const{rememberPassword:g}=C.value,{username:L,password:N}=e;C.value.username=g?L:"",C.value.password=g?N:""}else{if(!U.value){f.error("\u8BF7\u786E\u8BA4\u4E24\u6B21\u5BC6\u7801\u65E0\u8BEF");return}const g={tel:i.phone,code:i.verificationCode,memberPassword:i.memberPassword};m("auth_key")&&(g.shareCode=m("auth_key")),m("channelCustom")&&(g.channelCustom=m("channelCustom")),m("channel")&&(g.channel=m("channel")),m("public_channel")&&(g.publicChannel=m("public_channel")),m("bd_vid")&&(g.bdVid=m("bd_vid")),console.log(g,m("public_channel")),console.log(g,"req",m("channel"));const{data:L}=await de(g);await qe(L.token)}const{redirect:l,...n}=q.currentRoute.value.query;console.log(q),q.push({name:l||"Workplace",query:{...n}}),f.success(ge("login.form.login.success"))}catch(l){console.log(l),oe.value=l.message}finally{se(!1)}}},ke=u=>{C.value.rememberPassword=u};return(u,e)=>{const l=w("a-input"),n=w("a-form-item"),g=w("a-input-password"),L=w("a-checkbox"),N=w("a-link"),A=w("a-button"),G=w("a-space"),K=w("a-form"),ie=w("a-input-search");return v(),$("div",He,[c("div",Je,[c("div",Qe,[(v(!0),$(Ae,null,$e(S.value,(t,X)=>(v(),$("span",{key:X,class:Se(["textBox",_.value===X?"activeText":""]),onClick:mu=>Fe(X)},P(t),11,We))),128))])]),c("div",Ge,P(oe.value),1),r.value===1?(v(),F(K,{key:0,ref:"loginForm",model:E,class:"login-form",layout:"vertical",onSubmit:re},{default:a(()=>[s(n,{field:"username",rules:[{required:!0,message:u.$t("login.form.userName.errMsg")}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:E.username,"onUpdate:modelValue":e[0]||(e[0]=t=>E.username=t),placeholder:"\u8BF7\u8F93\u5165\u8D26\u53F7",class:"upai_input"},null,8,["modelValue"])]),_:1},8,["rules"]),s(n,{field:"password",rules:[{required:!0,message:u.$t("login.form.password.errMsg")}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(g,{modelValue:E.password,"onUpdate:modelValue":e[1]||(e[1]=t=>E.password=t),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801","allow-clear":"",class:"upai_input"},null,8,["modelValue"])]),_:1},8,["rules"]),s(G,{size:16,direction:"vertical"},{default:a(()=>[c("div",Ke,[s(L,{checked:"rememberPassword","model-value":T(C).rememberPassword,onChange:ke},{default:a(()=>[c("span",Xe,P(u.$t("login.form.rememberPassword")),1)]),_:1},8,["model-value"]),s(N,{style:{color:"#0c2963"},onClick:e[2]||(e[2]=t=>{r.value=3,x.value="\u6CE8\u518C",_.value=0})},{default:a(()=>[y("\u6CE8\u518C\u8D26\u53F7")]),_:1})]),s(A,{type:"primary","html-type":"submit",long:"",loading:T(z),class:"loginBtn"},{default:a(()=>[y(P(u.$t("login.form.login")),1)]),_:1},8,["loading"]),s(A,{type:"text",long:"",class:"login-form-register-btn fontColorClass",onClick:e[3]||(e[3]=t=>he())},{default:a(()=>[y(" \u5FD8\u8BB0\u5BC6\u7801 ")]),_:1})]),_:1})]),_:1},8,["model"])):B("",!0),r.value>=2&&r.value!=4?(v(),F(K,{key:1,ref:"loginForm",model:i,class:"login-form",layout:"vertical",onSubmit:re},{default:a(()=>[s(n,{field:"phone",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:i.phone,"onUpdate:modelValue":e[4]||(e[4]=t=>i.phone=t),placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",class:"upai_input"},null,8,["modelValue"])]),_:1}),r.value===3?(v(),F(n,{key:0,field:"pwd",rules:[{required:!1,message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:i.memberPassword,"onUpdate:modelValue":e[5]||(e[5]=t=>i.memberPassword=t),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",class:"upai_input",onChange:e[6]||(e[6]=t=>ne("logon"))},O({_:2},[b.value?{name:"append",fn:a(()=>[Ye]),key:"0"}:void 0]),1032,["modelValue"])]),_:1})):B("",!0),r.value===3?(v(),F(n,{key:1,field:"pwdagn",rules:[{required:!1,message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:i.memberPasswordCheck,"onUpdate:modelValue":e[7]||(e[7]=t=>i.memberPasswordCheck=t),placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",class:"upai_input",onChange:e[8]||(e[8]=t=>M("logon"))},O({_:2},[h.value?{name:"append",fn:a(()=>[c("img",{src:U.value?"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702":"https://img.adyinqing.com/upai_shop/zkiyezcb1689646895146",alt:"",class:"icon"},null,8,Ze)]),key:"0"}:void 0]),1032,["modelValue"])]),_:1})):B("",!0),s(n,{field:"verificationCode",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u6B63\u786E\u9A8C\u8BC1\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(ie,{modelValue:i.verificationCode,"onUpdate:modelValue":e[9]||(e[9]=t=>i.verificationCode=t),"button-text":k.value,"search-button":"",loading:j.value,placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801","allow-clear":"",class:"upai_input",onSearch:Be},null,8,["modelValue","button-text","loading"])]),_:1}),I.value?(v(),F(n,{key:2,field:"","hide-label":""},{default:a(()=>[s(ce,{onSuccess:le})]),_:1})):B("",!0),s(G,{size:16,direction:"vertical"},{default:a(()=>[c("div",eu,[uu,r.value===2?(v(),F(N,{key:0,style:{color:"#0c2963"},onClick:e[10]||(e[10]=t=>{r.value=3,x.value="\u6CE8\u518C",_.value=0})},{default:a(()=>[y("\u6CE8\u518C\u8D26\u53F7")]),_:1})):B("",!0)]),s(A,{type:"primary","html-type":"submit",long:"",loading:T(z),class:"loginBtn"},{default:a(()=>[y(P(x.value),1)]),_:1},8,["loading"]),r.value===3?(v(),F(A,{key:0,type:"text",long:"",class:"login-form-register-btn",onClick:e[11]||(e[11]=t=>{r.value=1,_.value=0})},{default:a(()=>[y(P(fe.value),1)]),_:1})):B("",!0)]),_:1})]),_:1},8,["model"])):B("",!0),r.value===4?(v(),F(K,{key:2,ref:"editForm",model:o,class:"login-form",layout:"vertical",onSubmit:we},{default:a(()=>[s(n,{field:"phone",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:o.phone,"onUpdate:modelValue":e[12]||(e[12]=t=>o.phone=t),placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",class:"upai_input"},null,8,["modelValue"])]),_:1}),s(n,{field:"verificationCode",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u6B63\u786E\u9A8C\u8BC1\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(ie,{modelValue:o.verificationCode,"onUpdate:modelValue":e[13]||(e[13]=t=>o.verificationCode=t),"button-text":k.value,"search-button":"",loading:j.value,placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801","allow-clear":"",class:"upai_input",onSearch:be},null,8,["modelValue","button-text","loading"])]),_:1}),I.value?(v(),F(n,{key:0,field:"","hide-label":""},{default:a(()=>[s(ce,{onSuccess:le})]),_:1})):B("",!0),s(n,{field:"pwd",rules:[{required:!1,message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:o.memberPassword,"onUpdate:modelValue":e[14]||(e[14]=t=>o.memberPassword=t),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",class:"upai_input",onChange:e[15]||(e[15]=t=>ne("edit"))},O({_:2},[J.value?{name:"append",fn:a(()=>[ou]),key:"0"}:void 0]),1032,["modelValue"])]),_:1}),s(n,{field:"pwdagn",rules:[{required:!1,message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:a(()=>[s(l,{modelValue:o.memberPasswordCheck,"onUpdate:modelValue":e[16]||(e[16]=t=>o.memberPasswordCheck=t),placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",class:"upai_input",onChange:e[17]||(e[17]=t=>M("edit"))},O({_:2},[V.value?{name:"append",fn:a(()=>[c("img",{src:Q.value?"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702":"https://img.adyinqing.com/upai_shop/zkiyezcb1689646895146",alt:"",class:"icon"},null,8,su)]),key:"0"}:void 0]),1032,["modelValue"])]),_:1}),s(G,{size:16,direction:"vertical"},{default:a(()=>[s(A,{type:"primary","html-type":"submit",long:"",loading:T(z),class:"loginBtn"},{default:a(()=>[y(P(x.value),1)]),_:1},8,["loading"]),r.value===4?(v(),F(A,{key:0,type:"text",long:"",class:"login-form-register-btn fontColorClass",onClick:Ce},{default:a(()=>[y(" \u524D\u5F80\u767B\u5F55 ")]),_:1})):B("",!0)]),_:1})]),_:1},8,["model"])):B("",!0)])}}});const tu=ee(au,[["__scopeId","data-v-45398901"]]),nu={class:"container"},lu={class:"content"},ru={class:"content-inner"},iu={class:"footer"},du=Z({__name:"index",setup(p){return(_,h)=>(v(),$("div",nu,[s(je),c("div",lu,[c("div",ru,[s(tu)]),c("div",iu,[s(De)])])]))}});const gu=ee(du,[["__scopeId","data-v-a9a7e0c5"]]);export{gu as default};
