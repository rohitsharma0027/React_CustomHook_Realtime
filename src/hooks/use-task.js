import { useState, useEffect, useCallback } from "react";

const useFetch = (requestConfig,applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        // 'https://react-http-83816-default-rtdb.firebaseio.com/tasks.json'
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method:'GET',
          headers:  requestConfig.method ? requestConfig.headers:{},
          body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data)
    
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[requestConfig,applyData]);

  return {
      isLoading:isLoading,
      error:error,
      sendRequest:sendRequest
  }
};

export default useFetch;
