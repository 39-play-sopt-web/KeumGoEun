import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PostListPage from "./pages/PostListPage";
import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from "./pages/PostEditPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/posts" element={<PostListPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/posts/new" element={<PostCreatePage />} />
           <Route path="/posts/:postId/edit" element={<PostEditPage />} />
        </Route>

        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
