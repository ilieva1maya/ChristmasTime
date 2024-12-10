export function deleteAccessTokenCookie() {
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict';
  }