export const storeInSession = (key: string, value: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.setItem(key, value);
    }
  };
  
  export const lookInSession = (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null; // Return null if localStorage is not available
  };
  
  export const removeFromSession = (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.removeItem(key);
    }
  };
  
  export const logOutUser = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.clear();
    }
  };