// 正则表达式
// const toThousands = (num: any) => {
//   if (num) {
//     return num.toString().replace(/\d+/, function (n: any) {
//       return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
//     });
//   }
//   return num;
// };

// const fun = (val: any) => {
//   if(val){
//       return Number(val).toFixed(2);
//   }else{
//       return val
//   }

// };
const fun = (val: any) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(val)) {
    return 0;
  }
  if (Number(val) === 0) {
    return 0;
  }
  if (val === Infinity) {
    return 0;
  }
  return Number(val).toFixed(2);
};
const fun2 = (val: any) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(val)) {
    return '-';
  }
  if (Number(val) === 0) {
    return '-';
  }
  if (val === Infinity) {
    return '-';
  }
  return Number(val).toFixed(2);
};
export { toThousands, fun, fun2 };
