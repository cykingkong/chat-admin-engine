// const str =
//   '123123123#1231231';


//   let regex = /([^\s#]+)|(\s*\d+.*)/g;

//   if(str.slice(0,1) !== '#'){
//     regex = /(\s*\d+.*)|(#([^\s#]+))/g;
//   }
//   let match = regex.exec(str);

// const finderTopicTagArr = [];
// const finderTopicNoTagArr = [];
// while (match !== null) {
//   if (match[1]) {
//     finderTopicTagArr.push(match[1]);
//   } else {
//     finderTopicNoTagArr.push(match[2]);
//   }
//   match = regex.exec(str);
// }
// console.log(finderTopicTagArr, finderTopicNoTagArr);


const str = '445645646#1231231#456456 126456';
const regex = /([a-zA-Z0-9\u4e00-\u9fa5]+)|(#\S+)/g;
let match = regex.exec(str);

const finderTopicTagArr = [];
const finderTopicNoTagArr = [];
while (match !== null) {
  finderTopicNoTagArr.push(match[1]);
  finderTopicTagArr.push(match[2]);
  match = regex.exec(str);
}
console.log(finderTopicTagArr, finderTopicNoTagArr); // ['1231231', '456456'] ['445645646', '126456']
