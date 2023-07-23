import { Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./pages/profile/Profile";
import AddPost from "./pages/posts/AddPost";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import PostList from "./pages/posts/PostList";
import PostDetail from "./pages/posts/PostDetail";
import PostEdit from "./pages/posts/PostEdit";
import EditProfile from "./pages/profile/EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/editpost/:id" element={<PostEdit />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
