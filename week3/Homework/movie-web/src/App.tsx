import { Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
    </Routes>
    </>
  );
}

export default App;