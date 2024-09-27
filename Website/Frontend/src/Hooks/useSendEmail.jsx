import { useState } from "react";
import axios from "axios";

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmail = async ({ to, subject, body }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-email",
        {
          to,
          subject,
          body,
        }
      );
      setSuccess(response.data);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error, success };
};

export default useSendEmail;
