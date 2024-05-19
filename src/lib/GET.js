const api_key = import.meta.env.VITE_apiKey;


const getData = (url) => {
    return fetch(api_key + url, {
      method: "GET",
      credentials: "include",
    });
  };



  export {getData}