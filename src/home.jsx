import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "./components/navBar";
import HotPicks from './components/hotPicks';
import About from './components/about';
import Contact from './components/contact';
import Top from './components/top';
import Starter from './components/starter';
import BookTable from './components/book';

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://flavor-fusion-eats-server.onrender.com/auth/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          const userData = response.data.user;
          if (userData) {
            setUser(userData);
          } else {
            // Token might be invalid or expired, handle accordingly
            setError("Failed to fetch user data");
            // Optionally: Implement token refresh or logout
            handleLogout();
          }
        })
        .catch(error => {
          console.error(error);
          setError("Failed to fetch user data");
        });
    } else {
      // Redirect to the login page if no token is present
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from state
    setUser(null);

    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
      <NavBar user={user} onLogout={handleLogout} />
      <Top user={user} />
      <HotPicks user={user} />
      <Starter user={user} />
      <About user={user} />
      <BookTable user={user} />
      <Contact user={user} />
    </div>
  );
};

export default Home;
