import{d as e,c as a,D as l,E as s,b9 as o,ba as t,H as r,u as n,f as i,r as d,w as u,aM as c,aL as m,aP as p,aF as v,aJ as g,aK as h,aO as f,aG as b,bt as w,bk as k,bu as _,bv as y,bw as C,bx as P,by as V,bl as x,bq as q,bz as j,bA as U,F as z}from"./arco.0e1801a1.js";import{F as $}from"./index.1df4b859.js";import{v as S,_ as A,u as F,s as L,a as I,b as E}from"./index.a302575e.js";/* empty css              *//* empty css               *//* empty css               *//* empty css               */import{f as O,g as R}from"./vue.6618b53d.js";import{u as B}from"./loading.4d3258a0.js";import"./chart.b4fe0742.js";const T=e=>(o("data-v-cbfb7a48"),e=e(),t(),e),H={class:"banner"},J=[T((()=>r("div",{class:"midImg"},[r("img",{src:"https://img.adyinqing.com/upai_shop/d57ook4m1689572521358",alt:""})],-1))),T((()=>r("div",{class:"logo"},[r("img",{src:"https://img.adyinqing.com/upai_shop/3h1sxrv71689912194354",alt:""})],-1)))],M=A(e({__name:"banner",setup:e=>(S.exports.useI18n(),a((()=>[])),(e,a)=>(l(),s("div",H,J)))}),[["__scopeId","data-v-cbfb7a48"]]),N={style:{width:"324px"}},W=["data-site-key"],D={created(){const e=this;this.dynamicLoadJs("//captcha.luosimao.com/static/js/api.js"),window.getResponse=a=>{const l=document.getElementsByName("luotest_response");1===l.length&&l[0].value===a?e.$emit("success",a):LUOCAPTCHA&&LUOCAPTCHA.reset()}},methods:{dynamicLoadJs:(e,a)=>new Promise(((a,l)=>{const s=document.createElement("script");s.type="text/javascript",s.src=e,s.onload=()=>{a()},s.onerror=()=>{l(new Error(`Failed to load script: ${e}`))},document.head.appendChild(s)}))}},G=Object.assign(D,{__name:"NC",setup:e=>(e,a)=>(l(),s("div",N,[r("div",{class:"l-captcha","data-site-key":n("56484aef3acd5df73d09124aea593b60"),"data-width":"324","data-callback":"getResponse",style:{width:"324px"}},null,8,W)]))}),K=e=>(o("data-v-45398901"),e=e(),t(),e),Q={class:"login-form-wrapper"},X={class:"login-form-title"},Y={class:"titleFlexBox"},Z=["onClick"],ee={class:"login-form-error-msg"},ae={class:"login-form-password-actions"},le={style:{color:"#0c2963"}},se=K((()=>r("img",{src:"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702",alt:"",class:"icon"},null,-1))),oe=["src"],te={class:"login-form-password-actions"},re=K((()=>r("div",{class:""},null,-1))),ne=K((()=>r("img",{src:"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702",alt:"",class:"icon"},null,-1))),ie=["src"],de=A(e({__name:"login-form",setup(e){const a=i(0),o=i(!1),t=i(!1),$=i(!1),A=i(!1),T=i(!0),H=i(!0),J=O(),{t:M}=S.exports.useI18n(),N=i(""),{loading:W,setLoading:D}=B(),K=F(),de=i(["密码登录","验证码登录"]),ue=i(1);i("登录");const ce=i("注册"),me=i("已有账号"),pe=R("login-config",{rememberPassword:!0,username:null,password:null}),ve=i("获取手机验证码");i("获取图片验证码"),i("");const ge=i(60),he=i(!1),fe=d({phone:"",verificationCode:"",memberPassword:"",memberPasswordCheck:"",token:""}),be=d({phone:"",verificationCode:"",memberPassword:"",memberPasswordCheck:"",token:""}),we=d({username:pe.value.username,password:pe.value.password}),ke=i();function _e(e){let a=new RegExp(`(^|&)${e}=([^&]*)(&|$)`,"i"),l=window.location.href.substr(1).match(a),s="";return null!=l&&(s=decodeURIComponent(l[2])),a=null,l=null,null==s||""==s||"undefined"==s?"":s}u(ue,((e,a)=>{ue.value<=2?de.value=["密码登录","验证码登录"]:3===ue.value?de.value=["注册"]:4===ue.value&&(de.value=["忘记密码"])}));const ye=()=>{ue.value=1,a.value=0};var Ce;if(Ce="//captcha.luosimao.com/static/js/api.js",new Promise(((e,a)=>{const l=document.createElement("script");l.type="text/javascript",l.src=Ce,l.onload=()=>{e()},l.onerror=()=>{a(new Error(`Failed to load script: ${Ce}`))},document.head.appendChild(l)})),_e("auth_key")&&(de.value=["注册"],ue.value=3),_e("auth_code")){ke.value=_e("auth_code"),K.SSOLogin(ke.value),localStorage.setItem("waitReload","1");const{redirect:e,...a}=J.currentRoute.value.query;J.push({name:e||"Workplace",query:{...a}})}function Pe(){fe.token="",be.token="",LUOCAPTCHA&&LUOCAPTCHA.reset()}const Ve=()=>{0===ge.value?(ve.value="获取手机验证码",he.value=!1,Pe(),je.value=!1):(ge.value--,ve.value=`${ge.value}s后重新发送`,he.value=!0),setTimeout((()=>{Ve()}),1e3)},xe=e=>{if("logon"===e){o.value||(o.value=!0);const e=fe.memberPasswordCheck.trim(),a=fe.memberPassword.trim();T.value=e===a}else if("edit"===e){t.value||(t.value=!0);const e=be.memberPasswordCheck.trim(),a=be.memberPassword.trim();H.value=e===a}},qe=e=>{"logon"===e?($.value||($.value=!0),fe.memberPasswordCheck.trim()&&xe(e)):"edit"===e&&(A.value||(A.value=!0),be.memberPasswordCheck.trim()&&xe(e))},je=i(!1),Ue=async()=>{fe.phone?/^1[3456789]\d{9}$/.test(fe.phone)?(fe.token&&L({tel:fe.phone,token:fe.token}).then((({data:e})=>{e&&(k.success("发送验证码成功，请注意查收"),ve.value="",Ve())})).catch((e=>{Pe()})),je.value=!0):k.info("手机号码有误，请重填"):k.info("请先输入手机号码")},ze=async()=>{be.phone?/^1[3456789]\d{9}$/.test(be.phone)?(be.token&&L({tel:be.phone,token:be.token,resetPassword:!0}).then((({data:e})=>{e&&(k.success("发送验证码成功，请注意查收"),ve.value="",Ve())})).catch((e=>{Pe()})),je.value=!0):k.info("手机号码有误，请重填"):k.info("请先输入手机号码")};async function $e(e){if(ge.value=60,4===ue.value){be.token=e;const{data:a}=await L({tel:be.phone,token:be.token,resetPassword:!0});return void(a&&(k.success("发送验证码成功，请注意查收"),ve.value="",Ve()))}fe.token=e;const{data:a}=await L({tel:fe.phone,token:fe.token});a&&(k.success("发送验证码成功，请注意查收"),ve.value="",Ve())}const Se=async({errors:e})=>{if(!e){if(!H.value)return void k.error("请确认两次密码无误");const e={tel:be.phone,code:be.verificationCode,memberPassword:be.memberPassword},{data:a,code:l}=await I(e);200===l&&(k.success("修改密码成功"),pe.value.password=be.memberPassword,pe.value.username=be.phone,we.username=pe.value.username,we.password=pe.value.password,ue.value=1)}},Ae=async({errors:e,values:a})=>{if(!W.value&&!e){D(!0);try{if(1===ue.value){await K.login(a);const{rememberPassword:e}=pe.value,{username:l,password:s}=a;pe.value.username=e?l:"",pe.value.password=e?s:""}else{if(!T.value)return void k.error("请确认两次密码无误");const e={tel:fe.phone,code:fe.verificationCode,memberPassword:fe.memberPassword};_e("auth_key")&&(e.shareCode=_e("auth_key")),_e("channelCustom")&&(e.channelCustom=_e("channelCustom")),_e("channel")&&(e.channel=_e("channel")),_e("public_channel")&&(e.publicChannel=_e("public_channel")),_e("bd_vid")&&(e.bdVid=_e("bd_vid"));const{data:a}=await I(e);await E(a.token)}const{redirect:e,...l}=J.currentRoute.value.query;J.push({name:e||"Workplace",query:{...l}}),k.success(M("login.form.login.success"))}catch(l){N.value=l.message}finally{D(!1)}}},Fe=e=>{pe.value.rememberPassword=e};return(e,i)=>{const d=_,u=y,k=C,S=P,F=V,L=x,I=q,E=j,O=U;return l(),s("div",Q,[r("div",X,[r("div",Y,[(l(!0),s(c,null,m(de.value,((e,o)=>(l(),s("span",{key:o,class:z(["textBox",a.value===o?"activeText":""]),onClick:e=>(e=>{ue.value<=2&&(a.value=e,ue.value=e?2:1,ce.value="登录")})(o)},p(e),11,Z)))),128))])]),r("div",ee,p(N.value),1),1===ue.value?(l(),v(E,{key:0,ref:"loginForm",model:we,class:"login-form",layout:"vertical",onSubmit:Ae},{default:g((()=>[h(u,{field:"username",rules:[{required:!0,message:e.$t("login.form.userName.errMsg")}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:we.username,"onUpdate:modelValue":i[0]||(i[0]=e=>we.username=e),placeholder:"请输入账号",class:"upai_input"},null,8,["modelValue"])])),_:1},8,["rules"]),h(u,{field:"password",rules:[{required:!0,message:e.$t("login.form.password.errMsg")}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(k,{modelValue:we.password,"onUpdate:modelValue":i[1]||(i[1]=e=>we.password=e),placeholder:"请输入密码","allow-clear":"",class:"upai_input"},null,8,["modelValue"])])),_:1},8,["rules"]),h(I,{size:16,direction:"vertical"},{default:g((()=>[r("div",ae,[h(S,{checked:"rememberPassword","model-value":n(pe).rememberPassword,onChange:Fe},{default:g((()=>[r("span",le,p(e.$t("login.form.rememberPassword")),1)])),_:1},8,["model-value"]),h(F,{style:{color:"#0c2963"},onClick:i[2]||(i[2]=e=>{ue.value=3,ce.value="注册",a.value=0})},{default:g((()=>[f("注册账号")])),_:1})]),h(L,{type:"primary","html-type":"submit",long:"",loading:n(W),class:"loginBtn"},{default:g((()=>[f(p(e.$t("login.form.login")),1)])),_:1},8,["loading"]),h(L,{type:"text",long:"",class:"login-form-register-btn fontColorClass",onClick:i[3]||(i[3]=e=>(ue.value=4,ce.value="修改密码",be.phone="",be.verificationCode="",be.memberPassword="",be.memberPasswordCheck="",void(be.token="")))},{default:g((()=>[f(" 忘记密码 ")])),_:1})])),_:1})])),_:1},8,["model"])):b("",!0),ue.value>=2&&4!=ue.value?(l(),v(E,{key:1,ref:"loginForm",model:fe,class:"login-form",layout:"vertical",onSubmit:Ae},{default:g((()=>[h(u,{field:"phone",rules:[{required:!0,message:"请输入手机号码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:fe.phone,"onUpdate:modelValue":i[4]||(i[4]=e=>fe.phone=e),placeholder:"请输入手机号码",class:"upai_input"},null,8,["modelValue"])])),_:1}),3===ue.value?(l(),v(u,{key:0,field:"pwd",rules:[{required:!1,message:"请输入密码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:fe.memberPassword,"onUpdate:modelValue":i[5]||(i[5]=e=>fe.memberPassword=e),placeholder:"请输入密码",class:"upai_input",onChange:i[6]||(i[6]=e=>qe("logon"))},w({_:2},[$.value?{name:"append",fn:g((()=>[se])),key:"0"}:void 0]),1032,["modelValue"])])),_:1})):b("",!0),3===ue.value?(l(),v(u,{key:1,field:"pwdagn",rules:[{required:!1,message:"请输入密码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:fe.memberPasswordCheck,"onUpdate:modelValue":i[7]||(i[7]=e=>fe.memberPasswordCheck=e),placeholder:"请再次输入密码",class:"upai_input",onChange:i[8]||(i[8]=e=>xe("logon"))},w({_:2},[o.value?{name:"append",fn:g((()=>[r("img",{src:T.value?"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702":"https://img.adyinqing.com/upai_shop/zkiyezcb1689646895146",alt:"",class:"icon"},null,8,oe)])),key:"0"}:void 0]),1032,["modelValue"])])),_:1})):b("",!0),h(u,{field:"verificationCode",rules:[{required:!0,message:"请输入正确验证码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(O,{modelValue:fe.verificationCode,"onUpdate:modelValue":i[9]||(i[9]=e=>fe.verificationCode=e),"button-text":ve.value,"search-button":"",loading:he.value,placeholder:"请输入验证码","allow-clear":"",class:"upai_input",onSearch:Ue},null,8,["modelValue","button-text","loading"])])),_:1}),je.value?(l(),v(u,{key:2,field:"","hide-label":""},{default:g((()=>[h(G,{onSuccess:$e})])),_:1})):b("",!0),h(I,{size:16,direction:"vertical"},{default:g((()=>[r("div",te,[re,2===ue.value?(l(),v(F,{key:0,style:{color:"#0c2963"},onClick:i[10]||(i[10]=e=>{ue.value=3,ce.value="注册",a.value=0})},{default:g((()=>[f("注册账号")])),_:1})):b("",!0)]),h(L,{type:"primary","html-type":"submit",long:"",loading:n(W),class:"loginBtn"},{default:g((()=>[f(p(ce.value),1)])),_:1},8,["loading"]),3===ue.value?(l(),v(L,{key:0,type:"text",long:"",class:"login-form-register-btn",onClick:i[11]||(i[11]=e=>{ue.value=1,a.value=0})},{default:g((()=>[f(p(me.value),1)])),_:1})):b("",!0)])),_:1})])),_:1},8,["model"])):b("",!0),4===ue.value?(l(),v(E,{key:2,ref:"editForm",model:be,class:"login-form",layout:"vertical",onSubmit:Se},{default:g((()=>[h(u,{field:"phone",rules:[{required:!0,message:"请输入手机号码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:be.phone,"onUpdate:modelValue":i[12]||(i[12]=e=>be.phone=e),placeholder:"请输入手机号码",class:"upai_input"},null,8,["modelValue"])])),_:1}),h(u,{field:"verificationCode",rules:[{required:!0,message:"请输入正确验证码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(O,{modelValue:be.verificationCode,"onUpdate:modelValue":i[13]||(i[13]=e=>be.verificationCode=e),"button-text":ve.value,"search-button":"",loading:he.value,placeholder:"请输入验证码","allow-clear":"",class:"upai_input",onSearch:ze},null,8,["modelValue","button-text","loading"])])),_:1}),je.value?(l(),v(u,{key:0,field:"","hide-label":""},{default:g((()=>[h(G,{onSuccess:$e})])),_:1})):b("",!0),h(u,{field:"pwd",rules:[{required:!1,message:"请输入密码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:be.memberPassword,"onUpdate:modelValue":i[14]||(i[14]=e=>be.memberPassword=e),placeholder:"请输入密码",class:"upai_input",onChange:i[15]||(i[15]=e=>qe("edit"))},w({_:2},[A.value?{name:"append",fn:g((()=>[ne])),key:"0"}:void 0]),1032,["modelValue"])])),_:1}),h(u,{field:"pwdagn",rules:[{required:!1,message:"请输入密码"}],"validate-trigger":["change","blur"],"hide-asterisk":""},{default:g((()=>[h(d,{modelValue:be.memberPasswordCheck,"onUpdate:modelValue":i[16]||(i[16]=e=>be.memberPasswordCheck=e),placeholder:"请再次输入密码",class:"upai_input",onChange:i[17]||(i[17]=e=>xe("edit"))},w({_:2},[t.value?{name:"append",fn:g((()=>[r("img",{src:H.value?"https://img.adyinqing.com/upai_shop/scg3q0ze1689586526702":"https://img.adyinqing.com/upai_shop/zkiyezcb1689646895146",alt:"",class:"icon"},null,8,ie)])),key:"0"}:void 0]),1032,["modelValue"])])),_:1}),h(I,{size:16,direction:"vertical"},{default:g((()=>[h(L,{type:"primary","html-type":"submit",long:"",loading:n(W),class:"loginBtn"},{default:g((()=>[f(p(ce.value),1)])),_:1},8,["loading"]),4===ue.value?(l(),v(L,{key:0,type:"text",long:"",class:"login-form-register-btn fontColorClass",onClick:ye},{default:g((()=>[f(" 前往登录 ")])),_:1})):b("",!0)])),_:1})])),_:1},8,["model"])):b("",!0)])}}}),[["__scopeId","data-v-45398901"]]),ue={class:"container"},ce={class:"content"},me={class:"content-inner"},pe={class:"footer"},ve=A(e({__name:"index",setup:e=>(e,a)=>(l(),s("div",ue,[h(M),r("div",ce,[r("div",me,[h(de)]),r("div",pe,[h($)])])]))}),[["__scopeId","data-v-a9a7e0c5"]]);export{ve as default};
