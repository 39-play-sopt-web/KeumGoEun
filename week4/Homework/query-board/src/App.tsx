import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PostListPage from "./pages/PostListPage";
import Header from './components/Header';
import PostCreatePage from "./pages/PostCreatePage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/new" element={<PostCreatePage />} />
      </Routes>
    </>
  );
}

export default App;
