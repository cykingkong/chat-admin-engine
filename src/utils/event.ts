export function addEventListen(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.addEventListener &&
    typeof target.addEventListener === 'function'
  ) {
    target.addEventListener(event, handler, capture);
  }
}

export function removeEventListen(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.removeEventListener &&
    typeof target.removeEventListener === 'function'
  ) {
    target.removeEventListener(event, handler, capture);
  }
}
export function clearAllChildren(items: any, childrenName = 'children') {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // 当前对象存在children
    if (item && item[childrenName]) {
      // children为空数组时删除
      if (item[childrenName].length === 0) {
        delete item[childrenName];
      } else {
        // 递归当前children数组
        clearAllChildren(item[childrenName], childrenName);
      }
    }
  }
  return items;
}

export function findLastIndexWithSameId(arr: any, id: any) {
  let lastIndex = -1;
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i].sphId === id) {
      lastIndex = i;
      break;
    }
  }
  return lastIndex;
}
export function getAllMenuIds(arr: any[]): any[] {
  if (!Array.isArray(arr)) {
    // 判断输入参数是否为数组

    return []; // 如果不是数组，则返回空数组
  }
  return arr.flatMap((item: any) => {
    if (item.children) {
      return [item.menuId, ...getAllMenuIds(item.children)];
    }
    return item.menuId;
  });
}
