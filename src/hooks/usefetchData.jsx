import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Assuming toast is imported from the React Toastify library
import { token } from '../config';

const UsefetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` 
              },

          
        });
        console.log(token)
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.message);
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, [url]);

  // Return data, loading, and error as an object to adhere to the hook return convention
  return { data, loading, error };
};

export default UsefetchData;
