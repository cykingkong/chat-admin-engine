/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
import fs from 'file-saver';
import XLSX from 'xlsx';

export function EXlsx(json: any, fields: any, filename = '表格') {
  // 导出xlsx
  // console.log(fields, 15)
  json.forEach((item: any) => {
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    for (const i in item) {
      if (fields[i]) {
        item[fields[i]] = item[i];
        item[fields[i]] = item[fields[i]] ? item[fields[i]] : '-';
        // console.log(item[fields[i]])
      }
      delete item[i]; // 删除原先的对象属性
    }
  });
  const sheetName = filename; // excel的文件名称
  const wb = XLSX.utils.book_new(); // 工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  const ws = XLSX.utils.json_to_sheet(json, { header: Object.values(fields) }); // 将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName);
  wb.Sheets[sheetName] = ws;
  const defaultCellStyle = {
    font: { name: 'Verdana', sz: 13, color: 'FF00FF88' },
    fill: { fgColor: { rgb: 'FFFFAA00' } },
  }; // 设置表格的样式
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    cellStyles: true,
    defaultCellStyle,
    showGridLines: false,
  }; // 写入的样式
  // @ts-ignore
  const wbout = XLSX.write(wb, wopts);
  // eslint-disable-next-line no-use-before-define
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  fs.saveAs(blob, `${filename}.xlsx`);
}

const s2ab = (s: any) => {
  let buf;
  if (typeof ArrayBuffer !== 'undefined') {
    buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  buf = new Array(s.length);
  // eslint-disable-next-line no-plusplus
  for (let j = 0; j !== s.length; ++j) buf[j] = s.charCodeAt(j) & 0xff;
  return buf;
};
