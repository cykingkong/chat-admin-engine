function e(e,n,t,r=!1){e.addEventListener&&"function"==typeof e.addEventListener&&e.addEventListener(n,t,r)}function n(e,n,t,r=!1){e.removeEventListener&&"function"==typeof e.removeEventListener&&e.removeEventListener(n,t,r)}function t(e,n="children"){for(let r=0;r<e.length;r++){const i=e[r];i&&i[n]&&(0===i[n].length?delete i[n]:t(i[n],n))}return e}function r(e){return Array.isArray(e)?e.flatMap((e=>e.children?[e.menuId,...r(e.children)]:e.menuId)):[]}export{e as a,t as c,r as g,n as r};
