export function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  const nameEQ = name + "=";
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

export function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname};`;
  // Optionally, handle secure and SameSite attributes
  // document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; Secure; SameSite=Strict`;
}

export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
  // Optionally, handle secure and SameSite attributes
  // document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=Strict`;
}
