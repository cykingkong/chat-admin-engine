import{d as Ge,r as i,i as He,f as Ne,a8 as r,j as l,o as O,a as Q,e as v,n as t,m as a,F as $e,k as Re,u as D,q as c,t as C,M as S,aa as qe,p as Le,b as Ue,l as je,_ as Je}from"./index.f3be9d6e.js";import{u as We}from"./loading.b87f2d78.js";import{x as Qe,y as Xe,z as Ze,A as et,d as tt,e as at}from"./plant.f4170702.js";import{e as ut,h as X}from"./enum.5f967a9b.js";import{g as ot}from"./settings.12ac4961.js";import{c as nt}from"./event.471a062e.js";import{E as lt,a as rt}from"./export-list.7cee4e1c.js";import{s as st}from"./sph.64c0f6af.js";const F=k=>(Le("data-v-672f0ad9"),k=k(),Ue(),k),it={class:"container"},ct={class:"upai_content"},dt=F(()=>v("div",{class:"pageTitle"}," \u8BA1\u5212\u5305\u6570\u636E ",-1)),pt=F(()=>v("div",{class:"labelText"},"\u540D\u79F0\u641C\u7D22\uFF1A",-1)),mt=F(()=>v("div",{class:"labelText"},"\u6240\u5C5E\u90E8\u95E8\uFF1A",-1)),ft=F(()=>v("div",{class:"labelText"},"\u52A0\u70ED\u72B6\u6001\uFF1A",-1)),_t=F(()=>v("div",{class:"labelText"},"\u521B\u5EFA\u65F6\u95F4\uFF1A",-1)),gt=Ge({__name:"data",setup(k,{expose:Z}){const z=i(),ee=[{label:"\u5F53\u65E5",value:()=>[r().startOf("date").format("YYYY-MM-DD HH:mm:ss"),r().endOf("date").format("YYYY-MM-DD HH:mm:ss")]},{label:"\u6628\u65E5",value:()=>[r().add(-1,"day").startOf("date").format("YYYY-MM-DD HH:mm:ss"),r().add(-1,"day").endOf("date").format("YYYY-MM-DD HH:mm:ss")]},{label:"\u8FD1\u4E00\u5468",value:()=>[r().add(-1,"week").startOf("date").format("YYYY-MM-DD HH:mm:ss"),r().add(-1,"day").endOf("date").format("YYYY-MM-DD HH:mm:ss")]},{label:"\u8FD1\u4E00\u6708",value:()=>[r().add(-1,"month").startOf("date").format("YYYY-MM-DD HH:mm:ss"),r().add(-1,"day").endOf("date").format("YYYY-MM-DD HH:mm:ss")]},{label:"\u672C\u6708",value:()=>[r().startOf("month").startOf("date").format("YYYY-MM-DD HH:mm:ss"),r().endOf("date").format("YYYY-MM-DD HH:mm:ss")]}],te=["","#7bc616","#ff5722"],{loading:ae,setLoading:G}=We(!0),b=i(!1),Y=i("\u65B0\u5EFA\u8BA1\u5212\u5305"),d=i({name:null,type:1}),H=i(),A={current:1,pageIndex:1,pageSize:30,defaultPageSize:30,pageSizeOptions:[10,30,50,100],total:0,defaultCurrent:1,page:1},V=i(!1),N=i([]),w=i([]),_=He({...A}),M=i([{colKey:"packageName",title:"\u8BA1\u5212\u5305\u540D\u79F0",fixed:"left",align:"left",width:220},{colKey:"memberDepName",title:"\u6240\u5C5E\u90E8\u95E8",align:"center",width:120},{colKey:"estimatedWecoinAmount",title:"\u6295\u653E\u603B\u91D1\u989D",align:"center",width:150,sortType:"all",sorter:!0},{colKey:"plantCount",title:"\u603B\u8BA1\u5212\u6761\u6570",align:"center",width:150,sortType:"all",sorter:!0},{colKey:"plantHotCount",title:"\u52A0\u70ED\u8BA1\u5212\u6761\u6570",align:"center",width:150,sortType:"all",sorter:!0},{colKey:"hotStatus",title:"\u52A0\u70ED\u72B6\u6001",align:"center",width:100},{colKey:"process",title:"\u6D88\u8017\u6BD4\u4F8B",align:"center",width:170},{colKey:"cost",title:"\u6D88\u8017\u91D1\u989D",align:"center",width:120,sortType:"all",sorter:!0},{colKey:"productOrderCount",title:"\u8BA2\u5355\u6570",align:"center",width:100,sortType:"all",sorter:!0},{colKey:"productPlaceorderGmv",title:"\u8425\u4E1A\u989D",align:"center",width:100,sortType:"all",sorter:!0},{colKey:"roi",title:"ROI",align:"center",width:100},{colKey:"lr",title:"\u5229\u6DA6",align:"center",width:100},{colKey:"airCost",title:"\u7A7A\u8017\u503C",align:"center",width:120,sortType:"all",sorter:!0},{colKey:"qan_cost",title:"\u5343\u5C55\u6210\u672C",width:"100",align:"center"},{colKey:"click_rate",title:"\u70B9\u51FB\u7387",width:"100",align:"center"},{colKey:"click_cost",title:"\u70B9\u51FB\u6210\u672C",width:"100",align:"center"},{colKey:"zh_cost",title:"\u8F6C\u5316\u6210\u672C",width:"100",align:"center"},{colKey:"zh_rate",title:"\u8F6C\u5316\u7387",width:"100",align:"center"},{colKey:"productClickCountPv",title:"\u5546\u54C1\u70B9\u51FB",align:"center",width:120,sortType:"all",sorter:!0},{colKey:"exposureCount",title:"\u6D4F\u89C8",align:"center",width:100,sortType:"all",sorter:!0},{colKey:"likeCount",title:"\u70B9\u8D5E",align:"center",width:100,sortType:"all",sorter:!0},{colKey:"favCount",title:"\u8BC4\u8BBA",align:"center",width:100,sortType:"all",sorter:!0},{colKey:"totalIndemnifyVoucherAmount",title:"\u8865\u8D34\u91D1\u989D",width:"120",align:"center"},{colKey:"indemnifyVoucherAmountRoi",title:"\u8865\u8D34ROI",width:"120",align:"center"},{colKey:"updatedAt",title:"\u66F4\u65B0\u65F6\u95F4",align:"center",width:120},{colKey:"op",title:"\u64CD\u4F5C",fixed:"right",align:"center",width:150}]);N.value=M.value.map(e=>e.colKey==="row-select"?console.log("45678"):e.colKey);const $=()=>({startDate:r().add(-1,"month").format("YYYY-MM-DD").toString(),endDate:r().format("YYYY-MM-DD").toString(),pageIndex:1,pageSize:30,hotStatus:-1,taskStatus:-1}),K=e=>isNaN(e)||Number(e)===0?0:Number(e).toFixed(2),g=e=>isNaN(e)||Number(e)===0||e===1/0?"-":Number(e).toFixed(2),s=i($()),R=i([]);i(0);const ue=i([]),oe=i([]),ne=i([]);function q(e,n){for(let u=0;u<e.length;u++){const p=e[u];if(p.memberDepId===n)return p.memberDepName;if(p.children&&p.children.length>0){const m=q(p.children,n);if(m)return m}}return null}const le=async e=>{const{data:n}=await ot(e);return n.grid?w.value=nt(n.grid):w.value=[],new Promise(u=>{u(!0)})},re=()=>{delete s.value.memberDepId},se=async()=>{const{data:e}=await st({pageIndex:1,pageSize:200,sphType:1});ue.value=e.grid},ie=async()=>{const{data:e}=await tt({pageIndex:1,pageSize:200});oe.value=e.grid},ce=async()=>{const{data:e}=await at({pageIndex:1,pageSize:200});ne.value=e.grid},P=async e=>{G(!0);try{const{data:n}=await Qe(e);n.grid&&n.grid.forEach((u,p)=>{u.key=String(p+1),u.click_cost=g(u.cost/u.productClickCountPv),u.memberDepName=u.memberDepId?q(w.value,u.memberDepId):"-",u.click_rate=g(u.productClickCountPv/u.exposureCount*100)==="-"?"-":`${g(u.productClickCountPv/u.exposureCount*100)}%`,u.qan_cost=g(u.cost/u.exposureCount*1e3),u.zh_cost=g(u.cost/u.productOrderCount),u.zh_rate=g(u.productOrderCount/u.productClickCountPv*100)==="-"?"-":`${g(u.productOrderCount/u.productClickCountPv*100)}%`,u.shutdownSwitch=u.shutdownStatus!==0,u.indemnifyVoucherAmountRoi=u.cost-u.totalIndemnifyVoucherAmount/100<=0?"-":g(u.productPlaceorderGmv/(u.cost-u.totalIndemnifyVoucherAmount/100));const m=r(u.indemnifyTs).isAfter(r());u.totalIndemnifyVoucherAmount>0&&(u.totalIndemnifyVoucherAmount/=100)}),R.value=n.grid||[],_.current=e.pageIndex,_.pageIndex=e.pageIndex,_.total=n.total}catch{}finally{G(!1)}},L=e=>{A.pageIndex=e.current,A.current=e.current,A.pageSize=e.pageSize,_.pageIndex=e.current,_.current=e.current,_.pageSize=e.pageSize,P({...s.value,...A})},de=e=>{s.value.startDate=e[0],s.value.endDate=e[1]},h=()=>{L({current:1,pageSize:_.pageSize})},pe=async e=>{const{data:n}=await Xe({packageId:e.packageId});n&&(S.success({content:"\u5220\u9664\u8BA1\u5212\u5305\u6210\u529F",duration:5*1e3}),await h())},U=async(e,n)=>{e===2?(Y.value="\u4FEE\u6539\u8BA1\u5212\u5305",d.value.packageId=n.packageId,d.value.name=n.packageName):(Y.value="\u65B0\u589E\u8BA1\u5212\u5305",d.value.name=null),d.value.type=e,b.value=!0},me=async e=>{var u;if(await((u=H.value)==null?void 0:u.validate())){e(!1);return}d.value.type===1?(await Ze({name:d.value.name}),S.success({content:"\u6DFB\u52A0\u8BA1\u5212\u5305\u6210\u529F",duration:5*1e3}),await h()):(await et({packageId:d.value.packageId,name:d.value.name}),S.success({content:"\u4FEE\u6539\u8BA1\u5212\u5305\u6210\u529F",duration:5*1e3}),await h()),d.value.name=null,window.setTimeout(()=>{e()},300)},fe=Ne(),_e=()=>{var e;(e=z.value)==null||e.showModel()},ge=()=>{qe.info({title:"\u63D0\u793A",content:"\u662F\u5426\u5BFC\u51FA\u9009\u4E2D\u6570\u636E\uFF1F",simple:!1,hideCancel:!1,cancelText:"\u53D6\u6D88",async onOk(){ye()}})},ye=async()=>{const e={...s.value};e.excel=!0;const{data:n,code:u,message:p}=await rt(e);u===200&&S.success("\u6570\u636E\u62A5\u8868\u751F\u6210\u4E2D\uFF0C\u8BF7\u524D\u5F80\u62A5\u8868\u5217\u8868\u67E5\u770B")},T=i([]);localStorage.getItem("package-disPlayColumns")?T.value=JSON.parse(localStorage.getItem("package-disPlayColumns")):M.value.forEach(e=>{T.value.push(e.colKey)});const he=async e=>{localStorage.setItem("package-disPlayColumns",JSON.stringify(e))},ve=e=>{fe.push({name:"plantData",query:{packageId:e.packageId,packageCreaedAt:r(e.createdAt).unix()}})},De=async e=>{e?(s.value.orderKey=e.sortBy,s.value.orderSort=e.descending?"DESC":"ASC"):s.value.orderSort=null,h()},x=i([]);x.value=[r().add(-1,"month"),r()];const Ce=()=>{s.value=$(),x.value=[r().add(-1,"month"),r()]};return(async()=>{se(),ie(),ce(),le({pageIndex:1,pageSize:150}).then(e=>{P({...s.value})})})(),Z({fetchData:P}),(e,n)=>{const u=l("Breadcrumb"),p=l("a-input"),m=l("a-form-item"),f=l("a-col"),Ae=l("a-cascader"),Be=l("a-option"),Fe=l("a-select"),ke=l("a-range-picker"),y=l("a-button"),be=l("a-link"),we=l("a-typography-text"),B=l("a-space"),E=l("a-row"),j=l("a-form"),J=l("a-card"),xe=l("icon-plus"),Ee=l("icon-unordered-list"),Ie=l("icon-down"),W=l("t-dropdown-item"),Se=l("t-divider"),Ye=l("t-dropdown-menu"),Ve=l("t-dropdown"),Me=l("icon-settings"),Ke=l("a-progress"),Pe=l("a-tag"),Te=l("a-popconfirm"),Oe=l("t-table"),ze=l("a-modal");return O(),Q("div",it,[v("div",ct,[t(u,{items:["\u6295\u6D41\u7BA1\u7406","\u8BA1\u5212\u5305"]}),dt,t(E,null,{default:a(()=>[t(J,{class:"general-card-upai",style:{width:"100%"}},{default:a(()=>[t(E,null,{default:a(()=>[t(f,{flex:1},{default:a(()=>[t(j,{model:s.value,"auto-label-width":"","label-align":"left"},{default:a(()=>[t(E,{gutter:16},{default:a(()=>[t(f,{span:8},{default:a(()=>[t(m,{field:"name"},{label:a(()=>[pt]),default:a(()=>[t(p,{modelValue:s.value.name,"onUpdate:modelValue":n[0]||(n[0]=o=>s.value.name=o),placeholder:"\u8BF7\u8F93\u5165\u8BA1\u5212\u5305\u540D\u79F0","allow-clear":"",onPressEnter:h},null,8,["modelValue"])]),_:1})]),_:1}),t(f,{span:8},{default:a(()=>[t(m,{field:"sphId"},{label:a(()=>[mt]),default:a(()=>[t(Ae,{modelValue:s.value.memberDepId,"onUpdate:modelValue":n[1]||(n[1]=o=>s.value.memberDepId=o),options:w.value,"check-strictly":"","allow-clear":"","field-names":{value:"memberDepId",label:"memberDepName"},placeholder:"\u8BF7\u9009\u62E9\u6240\u5C5E\u90E8\u95E8",onClear:re},null,8,["modelValue","options"])]),_:1})]),_:1}),t(f,{span:8},{default:a(()=>[t(m,{field:"hotStatus"},{label:a(()=>[ft]),default:a(()=>[t(Fe,{modelValue:s.value.hotStatus,"onUpdate:modelValue":n[2]||(n[2]=o=>s.value.hotStatus=o),placeholder:"\u8BF7\u9009\u62E9\u52A0\u70ED\u72B6\u6001"},{default:a(()=>[(O(!0),Q($e,null,Re(D(ut)(D(X)),(o,I)=>(O(),je(Be,{key:I,label:o.label,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),t(f,{span:10},{default:a(()=>[t(m,{field:"createdTime"},{label:a(()=>[_t]),default:a(()=>[t(ke,{modelValue:x.value,"onUpdate:modelValue":n[3]||(n[3]=o=>x.value=o),"show-time":"","default-value":[D(r)().add(-1,"month"),D(r)()],style:{width:"100%"},shortcuts:ee,"shortcuts-position":"left",onChange:de},null,8,["modelValue","default-value"])]),_:1})]),_:1}),t(f,{span:8}),t(f,{span:6}),t(f,{span:8},{default:a(()=>[t(m,{field:"number","hide-label":!0},{default:a(()=>[t(B,{size:18},{default:a(()=>[t(y,{type:"primary",class:"searchBtn",onClick:h},{default:a(()=>[c(" \u7B5B\u9009 ")]),_:1}),t(y,{type:"outline",class:"refreshBtn",onClick:n[4]||(n[4]=o=>h())},{default:a(()=>[c(" \u5237\u65B0 ")]),_:1}),t(we,{type:"primary"},{default:a(()=>[t(be,{href:"javascript:void(0)",onClick:n[5]||(n[5]=o=>Ce())},{default:a(()=>[c("\u91CD\u7F6E\u7B5B\u9009\u6761\u4EF6")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})]),_:1})]),_:1}),t(J,{class:"general-card-upai",style:{width:"100%","padding-bottom":"28px"}},{default:a(()=>[t(E,{justify:"space-between"},{default:a(()=>[t(f,{flex:"250px"},{default:a(()=>[t(B,{size:18,style:{"margin-bottom":"10px"}},{default:a(()=>[t(y,{type:"primary",onClick:n[6]||(n[6]=o=>U(1))},{icon:a(()=>[t(xe)]),default:a(()=>[c(" \u521B\u5EFA\u8BA1\u5212\u5305 ")]),_:1}),t(Ve,{"min-column-width":88},{default:a(()=>[t(y,{type:"primary",status:"success",class:"searchBtn"},{icon:a(()=>[t(Ee)]),default:a(()=>[t(B,null,{default:a(()=>[c(" \u5BFC\u51FA "),t(Ie)]),_:1})]),_:1}),t(Ye,null,{default:a(()=>[t(W,{value:1,divider:"",onClick:n[7]||(n[7]=o=>ge())},{default:a(()=>[c(" \u5BFC\u51FA ")]),_:1}),t(Se),t(W,{value:2,onClick:_e},{default:a(()=>[c(" \u62A5\u8868\u5217\u8868 ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(f,{flex:"60px"},{default:a(()=>[t(B,{size:18,style:{"margin-bottom":"10px"}},{default:a(()=>[t(y,{type:"primary",onClick:n[8]||(n[8]=o=>V.value=!0)},{icon:a(()=>[t(Me)]),default:a(()=>[c(" \u5217\u8868\u914D\u7F6E ")]),_:1})]),_:1})]),_:1})]),_:1}),t(Oe,{columnControllerVisible:V.value,"onUpdate:columnControllerVisible":n[9]||(n[9]=o=>V.value=o),"row-key":"plantId",data:R.value,columns:M.value,loading:D(ae),"header-affixed-top":!0,"max-height":1e3,"column-controller":{placement:"top-right",fields:N.value,dialogProps:{preventScrollThrough:!0},hideTriggerButton:!0},pagination:_,bordered:!1,"table-layout":"fixed","default-display-columns":T.value,"on-display-columns-change":he,onPageChange:L,onSortChange:De},{process:a(({row:o})=>[t(Ke,{percent:Number(K(o.cost/o.estimatedWecoinAmount)),style:{width:"50%"}},null,8,["percent"])]),roi:a(({row:o})=>[c(C(K(o.productPlaceorderGmv/o.cost)),1)]),lr:a(({row:o})=>[c(C(K(o.productPlaceorderGmv-o.cost)),1)]),hotStatus:a(({row:o})=>[t(Pe,{color:te[o.hotStatus]},{default:a(()=>[c(C(D(X)[o.hotStatus]),1)]),_:2},1032,["color"])]),totalIndemnifyVoucherAmount:a(({row:o})=>[t(B,null,{default:a(()=>[v("span",null,C(o.totalIndemnifyVoucherAmount?`\xA5${o.totalIndemnifyVoucherAmount}`:"-"),1)]),_:2},1024)]),totalIndemnifyVoucherIntoAmount:a(({row:o})=>[c(C(o.totalIndemnifyVoucherIntoAmount?`\xA5${o.totalIndemnifyVoucherIntoAmount/100}`:"-"),1)]),indemnifyVoucherAmountRoi:a(({row:o})=>[c(C(o.indemnifyVoucherAmountRoi||"-"),1)]),op:a(({row:o})=>[t(y,{type:"text",size:"small",onClick:I=>ve(o)},{default:a(()=>[c(" \u67E5\u770B\u8BA1\u5212 ")]),_:2},1032,["onClick"]),t(y,{type:"text",size:"small",onClick:I=>U(2,o)},{default:a(()=>[c(" \u4FEE\u6539 ")]),_:2},1032,["onClick"]),t(Te,{content:"\u786E\u8BA4\u662F\u5426\u5220\u9664\u6B64\u8BA1\u5212","ok-text":"\u786E\u8BA4",onOk:I=>pe(o)},{default:a(()=>[t(y,{type:"text",size:"small"},{default:a(()=>[c(" \u5220\u9664 ")]),_:1})]),_:2},1032,["onOk"])]),_:1},8,["columnControllerVisible","data","columns","loading","column-controller","pagination","default-display-columns"])]),_:1})]),t(lt,{ref_key:"exportList",ref:z},null,512),t(ze,{visible:b.value,"onUpdate:visible":n[11]||(n[11]=o=>b.value=o),title:Y.value,onCancel:n[12]||(n[12]=o=>b.value=!1),onBeforeOk:me},{default:a(()=>[t(j,{ref_key:"formGpRef",ref:H,model:d.value,"label-col-props":{span:6},"wrapper-col-props":{span:18}},{default:a(()=>[t(m,{field:"name",label:"\u8BA1\u5212\u5305\u540D\u79F0",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u8BA1\u5212\u5305\u540D\u79F0"}]},{default:a(()=>[t(p,{modelValue:d.value.name,"onUpdate:modelValue":n[10]||(n[10]=o=>d.value.name=o)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["visible","title"])])}}});const bt=Je(gt,[["__scopeId","data-v-672f0ad9"]]);export{bt as default};
