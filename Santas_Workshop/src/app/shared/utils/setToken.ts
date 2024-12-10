export function setAccessTokenInCookie(accessToken: string) {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Set cookie expiration to 1 hour from now
  
    document.cookie = `accessToken=${accessToken};expires=${expirationDate.toUTCString()};path=/;Secure;SameSite=Strict`;
  }