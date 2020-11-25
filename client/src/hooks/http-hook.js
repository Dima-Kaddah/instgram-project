import { useState, useCallback, useRef, useEffect } from 'react';
import M from 'materialize-css';

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl,
        );

        if (!response.ok) {
          throw M.toast({ html: responseData.message, classes: '#c62828 red darken-3' });
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message || 'Somthing Went wrong, Please try again.');
        setIsLoading(false);
        throw M.toast({ html: err.message, classes: '#c62828 red darken-3' });
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest };
};
export default useHttpClient;