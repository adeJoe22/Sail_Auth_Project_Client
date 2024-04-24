import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchLoggedInUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const decoded = jwtDecode(token);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:4040/api/user/${decoded.id}`,
          config
        );
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching logged-in users:', error);
      }
    };

    fetchLoggedInUsers();

    // Clean up function if needed
    return () => {
      // Any cleanup code can go here
    };
  }, []);
  return (
    <div>
      <h1>{user.firstName}</h1>
    </div>
  );
};

export default Home;
