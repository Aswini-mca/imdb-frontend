import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Forgetpassword from './components/Forgetpassword';
import Resetpassword from './components/Resetpassword';
import Movie from './components/Movie';
import CreateMovie from './components/createMovie';
import store from './store/store';
import { Provider } from 'react-redux';
import MovieList from './components/MovieList';
import { useEffect, useState } from 'react';
import EditMovie from './components/EditMovie';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Provider store={store}>
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/reset-password/:resetToken" element={<Resetpassword />} />
          <Route path="/movie/:movieName" element={<Movie />} />
          <Route path="/movie/create" element={<CreateMovie token={token}/>} />
          <Route path="/movieList" element={<MovieList token={token}/>} />
          <Route path="/movie/edit/:movieName" element={<EditMovie token={token}/>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
    </Provider>
  );
}

export default App;
