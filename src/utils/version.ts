// @ts-ignore
// eslint-disable-next-line import/prefer-default-export
export function compareVersions(version1: any, version2: any) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');

  // @ts-ignore
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    const num1 = parseInt(arr1[i], 10) || 0;
    const num2 = parseInt(arr2[i], 10) || 0;

    if (num1 < num2) {
      return -1;
    }
    if (num1 > num2) {
      return 1;
    }
  }

  return 0;
}
