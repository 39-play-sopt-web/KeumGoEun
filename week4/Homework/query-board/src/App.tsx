import { Route, Routes } from 'react-router-dom';
import AuthPage  from './pages/AuthPage'
import PostListPage from './pages/PostListPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/posts" element={<PostListPage />} />
    </Routes>
  );
}

export default App;
