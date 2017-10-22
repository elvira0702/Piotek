
export function setCookie(key, value, iDay) {
  const oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = key + '=' + value + ';expires=' + oDate;
}

export function removeCookie(key) {
  setCookie(key, '', -1); // 这里只需要把Cookie保质期退回一天便可以删除
}

export function getCookie(key) {
  const cookieArr = document.cookie.split('; ');
  for (let i = 0; i < cookieArr.length; i++) {
    const arr = cookieArr[i].split('=');
    if (arr[0] === key) {
      return arr[1];
    }
  }
  return false;
}

// sessionStorage
export function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, value);
}

export function showSessionStorage(key) {
  const value = sessionStorage.getItem(key);
  return value ? value : false;
}

// localStorage
export function savelocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function showlocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? value : false;
}
