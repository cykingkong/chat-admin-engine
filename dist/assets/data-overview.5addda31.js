import{v as a,_ as e}from"./index.a302575e.js";/* empty css                *//* empty css               *//* empty css              *//* empty css               *//* empty css              */import{d as t,b6 as l,f as s,b_ as i,r as n,o,aH as u,D as d,E as c,aK as r,aJ as m,F as p,aG as v,aO as y,H as f,aM as g,aL as k,u as h,aP as x,c2 as b,c3 as Y,bl as _,ce as D,bq as H,bK as M,b9 as F,ba as w,n as C,G as q,aF as B,a$ as j,b0 as O}from"./arco.0e1801a1.js";import{f as S}from"./vue.6618b53d.js";import{u as L}from"./loading.4d3258a0.js";import{u as P}from"./themes.dd6e2da4.js";import{m as T,c as A}from"./merchantApi.2fad71a7.js";import"./chart.b4fe0742.js";const E=a=>isNaN(a)||0===Number(a)||a===1/0?0:Number(a).toFixed(2),N=a=>(F("data-v-c73c87cc"),a=a(),w(),a),V={class:"container"},G={key:0,src:"https://img.adyinqing.com/upai_shop/x3pg1vne1690430298724",alt:"",class:"icon"},z={key:1,class:"tipsText"},I={key:0,src:"https://img.adyinqing.com/upai_shop/x3pg1vne1690430298724",alt:"",class:"icon"},K={key:1,class:"tipsText"},J={class:"upai_outsideBox"},R=N((()=>f("div",{class:"title"},"经营数据 ",-1))),U={class:"flexBox"},$={style:{"margin-right":"10px"},class:"dnm"},Q={class:"datePickBox"},W=["onClick"],X={class:"upai_grid"},Z={class:"infoBox"},aa={class:"infoTitle"},ea={class:"num"},ta={key:0,class:"rmb"},la={key:1,class:"rmb"},sa={class:"n2"},ia={class:"upai_outsideBox",style:{height:"240px"}},na=N((()=>f("div",{class:"title"},"订单来源 ",-1))),oa={class:"orderComeTypeBox"},ua=["onClick"],da={class:"infoBox"},ca={class:"infoTitle"},ra={class:"num"},ma={class:"rmb"},pa={class:"upai_outsideBox",style:{height:"240px"}},va=N((()=>f("div",{class:"title"},"待处理 ",-1))),ya={class:"infoBox",style:{"padding-top":"15px"}},fa={class:"infoTitle"},ga={class:"num"},ka={class:"upai_outsideBox",style:{height:"240px"}},ha=N((()=>f("div",{class:"title"},"商品概况 ",-1))),xa={class:"infoBox",style:{"padding-top":"15px"}},ba={class:"infoTitle"},Ya={class:"num"},_a=e(t({__name:"data-overview",setup(e){l((a=>({b8a64a08:ja.value,"0371a6c5":Ba.value})));const t=s(0),F=s(0),w=s(!1),N=s(!1),_a=s(!1),Da=s(!1),Ha=()=>{La.push({name:"merchantList"})},Ma=s([{label:"销售中",n:0,key:"sellingCount"},{label:"待上架",n:0,key:"preShowCount"},{label:"审核中",n:0,key:"reviewingCount"}]),Fa=s([{label:"广告来源",data:[{t:"成交金额",key:"advertisingFlowPrice",n:0,n2:0},{t:"成交订单数",key:"advertisingFlowCount",n:0,n2:0}]},{label:"自然流量",data:[{t:"成交金额",key:"naturalFlowPrice",n:0,n2:0},{t:"成交订单数",key:"naturalFlowCount",n:0,n2:0}]}]),wa=s([]),Ca=s([{label:"待付款",n:0,key:"prePayCount"},{label:"待发货",n:0,key:"preSendCount"},{label:"售后",n:0,key:"preAfterSales"}]),qa=[{label:"当日",value:[i().startOf("day").format("YYYY-MM-DD  HH:mm:ss"),i().endOf("date").format("YYYY-MM-DD  HH:mm:ss")]},{label:"昨日",value:[i().add(-1,"day").startOf("day").format("YYYY-MM-DD  HH:mm:ss"),i().add(-1,"day").endOf("date").format("YYYY-MM-DD  HH:mm:ss")]},{label:"近一周",value:[i().add(-1,"week").startOf("day").format("YYYY-MM-DD  HH:mm:ss"),i().add(-1,"day").endOf("date").format("YYYY-MM-DD  HH:mm:ss")]},{label:"近一月",value:[i().add(-1,"month").startOf("day").format("YYYY-MM-DD  HH:mm:ss"),i().add(-1,"day").endOf("date").format("YYYY-MM-DD  HH:mm:ss")]},{label:"本月",value:[i().startOf("month").startOf("day").format("YYYY-MM-DD  HH:mm:ss"),i().endOf("date").format("YYYY-MM-DD  HH:mm:ss")]}];s(0),s(0);const Ba=s("#ff330026"),ja=s("#ff3300"),Oa=["#FFF4F3","#EFFAFF","#EFF7FF","#F7F3FF","#F4F4F4"];s([{title:"账户数据",numList:[{t:"在线投放号",key:"onlineAccount",url:"https://img.adyinqing.com/upai_shop/sqolvvco1676629138552",n:0,color:""},{t:"在线被投号",url:"https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525",n:0,key:"onlineAccountBack"},{t:"即将掉线",url:"https://img.adyinqing.com/upai_shop/sqolvvco1676629138552",n:0,key:"onlineAccountLeave"},{t:"已离线",url:"https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525",n:0,key:"onlineAccountLeaveEd"},{t:"总余额",key:"accountBalance",url:"https://img.adyinqing.com/upai_shop/sqolvvco1676629138552",n:0},{t:"加热中计划数",url:"https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525",n:0,key:"hotPlant"},{t:"加热中视频数",url:"https://img.adyinqing.com/upai_shop/sqolvvco1676629138552",n:0,key:"hotVideo"},{t:"加热中商品数",url:"https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525",key:"hotGoods",n:0}]}]);const Sa=s({startDate:i().startOf("date").format("YYYY-MM-DD HH:mm:ss").toString(),endDate:i().endOf("date").format("YYYY-MM-DD HH:mm:ss").toString(),mid:void 0}),La=S();a.exports.useI18n();const{loading:Pa,setLoading:Ta}=L(!0);P();const Aa=s([{title:"成交金额",num:0,num2:0,type:!0,key:"dealPrice",key2:"productPlaceorderGmvHb",url:"https://img.adyinqing.com/upai_shop/5dea827e1676628633698"},{title:"成交订单数",num:0,num2:0,type:!1,key:"dealCount",key2:"productOrderCountHb",url:"https://img.adyinqing.com/upai_shop/9phewe3x1676628682838"},{title:"下单金额",num:0,num2:0,type:!0,key:"orderPrice",key2:"costHb",url:"https://img.adyinqing.com/upai_shop/39ttxfcp1676628721182"},{title:"下单订单数",num:0,num2:0,type:!1,key:"orderCount",key2:"roiHb",url:"https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667"},{title:"支付转化率",num:0,num2:0,type:!0,key:"transformRate",key2:"yj_roiHb",url:"https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667"}]),Ea=s([]),Na=(a,e)=>{Ea.value=e},Va=a=>{const e=Ea.value;if(e&&e.length){const t=e[0]&&Math.abs((new Date(a)-e[0])/864e5)>30;return e[1]&&Math.abs((new Date(a)-e[1])/864e5)>30||t}return!1},Ga=async()=>{Ta(!0);try{const{data:a}=await A(Sa.value);Aa.value.forEach((e=>{"orderCount"===e.key||"dealCount"===e.key?e.num=a.storeList[e.key]:e.num=E(a.storeList[e.key]),a.yesterday&&("orderCount"===e.key||"dealCount"===e.key?e.num2=a.yesterday[e.key]:e.num2=E(a.yesterday[e.key]))})),Ca.value.forEach((e=>{e.n=a.storeList[e.key]})),C((()=>{Fa.value.forEach((e=>{e.data.forEach((e=>{e.n=Number(a.storeList[e.key]),Number(a.storeList[e.key])<0&&("naturalFlowPrice"===e.key||"naturalFlowCount"===e.key)&&(e.n="异常"),a.yesterday&&(e.n2=Number(a.yesterday[e.key])?Number(a.yesterday[e.key]):0)}))}))}))}catch(a){}finally{Ta(!1)}},za=n({current:1,pageIndex:1,pageSize:10}),Ia=async()=>{await(async a=>{const{data:e}=await T(a);e.grid?(e.grid.unshift({mid:void 0,nickname:"全部"}),wa.value=e.grid,Sa.value.mid=e.grid[0].mid):(Sa.value.mid=void 0,w.value=!0,setTimeout((()=>{_a.value=!0}),320))})({...za}),await Ga(),await(N.value=!0,void setTimeout((()=>{Da.value=!0}),320))};o((()=>{Ia()})),s();const Ka=s(!1),Ja=a=>{a||(Ea.value=[])},Ra=a=>{Sa.value.startDate=a[0].toString(),Sa.value.endDate=a[1].toString(),Ka.value&&(Ka.value=!1),t.value=-10,Ga()};return(a,e)=>{const l=b,s=Y,n=u("t-select"),o=_,C=D,S=H,L=M;return d(),c("div",V,[r(s,{align:"center"},{default:m((()=>[r(l,null,{default:m((()=>[w.value?(d(),c("div",{key:0,class:p(["topTipsBar",w.value?"tipsShow":""])},[_a.value?(d(),c("img",G)):v("",!0),_a.value?(d(),c("div",z,[y("您暂未绑定店铺，请 "),f("span",{class:"link",onClick:Ha},"前往绑定")])):v("",!0)],2)):(d(),c("div",{key:1,class:p(["topTipsBar",N.value?"tipsShow":""])},[Da.value?(d(),c("img",I)):v("",!0),Da.value?(d(),c("div",K," 建议绑定运营中的店铺，保证数据的准确性。 ")):v("",!0)],2))])),_:1})])),_:1}),r(L,{loading:h(Pa),style:{width:"100%"}},{default:m((()=>[r(S,{direction:"vertical",fill:"",size:"medium"},{default:m((()=>[r(s,null,{default:m((()=>[f("div",J,[r(s,{align:"center",justify:"space-between"},{default:m((()=>[r(l,{flex:"293px"},{default:m((()=>[R])),_:1}),r(l,{flex:"589px"},{default:m((()=>[f("div",U,[f("div",$,[r(n,{modelValue:Sa.value.mid,"onUpdate:modelValue":e[0]||(e[0]=a=>Sa.value.mid=a),placeholder:"选择店铺",style:{},class:"custom-select",options:wa.value,keys:{value:"mid",label:"nickname"},onChange:e[1]||(e[1]=a=>{Ga()})},null,8,["modelValue","options"])]),f("div",Q,[(d(),c(g,null,k(qa,((a,e)=>f("div",{key:e,class:p(["btn",{active:t.value===e}]),onClick:a=>(a=>{a===t.value?(t.value=-1,Sa.value.startDate=i().format("YYYY-MM-DD"),Sa.value.endDate=i().format("YYYY-MM-DD"),Ka.value&&(Ka.value=!1,Ea.value=[]),Ga()):5===a?(t.value=a,Ka.value=!0):(t.value=a,Ka.value&&(Ka.value=!1,Ea.value=[]),Sa.value.startDate=qa[a].value[0].toString(),Sa.value.endDate=qa[a].value[1].toString(),Ga())})(e)},x(a.label),11,W))),64)),r(C,{"default-value":[h(i)(),h(i)()],"shortcuts-position":"left",style:{width:"560px"},"disabled-date":Va,onSelect:Na,onPopupVisibleChange:Ja,onChange:Ra},{default:m((()=>[r(o,{class:p(["btn zdy",{active:-10===t.value}])},{default:m((()=>[y(x("自定义"))])),_:1},8,["class"])])),_:1},8,["default-value"])])])])),_:1})])),_:1}),f("div",X,[(d(!0),c(g,null,k(Aa.value,((a,e)=>(d(),c("div",{key:e},[f("div",{class:"upai_card_m",style:q({backgroundColor:Oa[e]})},[f("div",Z,[f("div",aa,x(a.title),1),f("div",ea,[a.type&&4!==e?(d(),c("span",ta,"¥")):v("",!0),y(x(a.num),1),a.type&&4===e?(d(),c("span",la,"%")):v("",!0)]),f("div",sa," 昨日"+x(t.value>=2?"- -":a.num2),1)])],4)])))),128))])])])),_:1}),r(s,{gutter:[20,20]},{default:m((()=>[r(l,{flex:"50%"},{default:m((()=>[f("div",ia,[r(s,{align:"center",justify:"space-between",style:{"margin-bottom":"24px"}},{default:m((()=>[r(l,{flex:"293px"},{default:m((()=>[na])),_:1}),r(l,{flex:"209px"},{default:m((()=>[f("div",oa,[(d(!0),c(g,null,k(Fa.value,((a,e)=>(d(),c("div",{key:e,class:p(["comeBtn",{comeBtnActive:e==F.value}]),onClick:a=>(a=>{F.value=a})(e)},x(a.label),11,ua)))),128))])])),_:1})])),_:1}),r(s,null,{default:m((()=>[(d(!0),c(g,null,k(Fa.value[F.value].data,((a,e)=>(d(),B(l,{key:e,flex:"50%",class:"dataBox"},{default:m((()=>[f("div",da,[f("div",ca,x(a.t),1),f("div",ra,[j(f("span",ma,"¥",512),[[O,0===e&&"异常"!=a.n]]),y(x(a.n),1)]),j(f("div",{class:"n2"}," 昨日"+x(a.n2),513),[[O,t.value<2]])])])),_:2},1024)))),128))])),_:1})])])),_:1}),r(l,{flex:"50%"},{default:m((()=>[f("div",pa,[r(s,{align:"center",justify:"space-between",style:{"margin-bottom":"24px"}},{default:m((()=>[r(l,{flex:"293px"},{default:m((()=>[va])),_:1}),r(l,{flex:"589px"})])),_:1}),r(s,null,{default:m((()=>[(d(!0),c(g,null,k(Ca.value,((a,e)=>(d(),B(l,{key:e,span:8,class:"dataBox"},{default:m((()=>[f("div",ya,[f("div",fa,x(a.label),1),f("div",ga,x(a.n),1)])])),_:2},1024)))),128))])),_:1})])])),_:1}),r(l,{flex:"50%"},{default:m((()=>[f("div",ka,[r(s,{align:"center",justify:"space-between",style:{"margin-bottom":"24px"}},{default:m((()=>[r(l,{flex:"293px"},{default:m((()=>[ha])),_:1}),r(l,{flex:"589px"})])),_:1}),r(s,null,{default:m((()=>[(d(!0),c(g,null,k(Ma.value,((a,e)=>(d(),B(l,{key:e,span:8,class:"dataBox"},{default:m((()=>[f("div",xa,[f("div",ba,x(a.label),1),f("div",Ya,x(a.n),1)])])),_:2},1024)))),128))])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1},8,["loading"])])}}}),[["__scopeId","data-v-c73c87cc"]]);export{_a as default};
