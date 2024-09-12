// import { useState } from "react";
// import axios from "axios";

// const usePostData = (url) => {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const postData = async (data) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(url, data);
//       setResponse(res.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { response, loading, error, postData };
// };

// export default usePostData;
import { useState } from "react";
import axios from "axios";

const usePostData = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setLoading(true);
    setError(null); // Reset error before making a new request
    try {
      const res = await axios.post(url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // More detailed error handling
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default usePostData;
