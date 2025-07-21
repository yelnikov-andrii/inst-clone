import { Route, Routes } from "react-router"
import Auth from "./pages/Auth"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Direct from "./pages/Direct";
import DefaultMainDirect from "./components/direct/DefaultMainDirect";
import UserMainDirect from "./components/direct/UserMainDirect";
import Profile from "./pages/Profile";
import PostsDefault from "./components/profile/PostsDefault";
import Saved from "./components/profile/Saved";
import Tagged from "./components/profile/Tagged";
import Activate from "./pages/Activate";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { useEffect } from "react";
import { logIn } from "./features/auth/authSlice";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Accounts from "./pages/Accounts";
import Edit from "./components/accounts/edit/Edit";
import Notifications from "./components/accounts/notifications/Notifications";


function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('inst_accessToken');
    const userStr = localStorage.getItem('inst_user');
    let user;

    if (userStr) {
      user = JSON.parse(userStr);
    }
    
    if (accessToken && user) {
      dispatch(logIn({ accessToken, user }))
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />

      <Route path="/accounts/emailsignup" element={<SignUp />} />
      <Route path="/accounts/activation" element={<Activate />} />
      <Route path="/accounts/login" element={<Login />} />
      <Route path="/accounts" element={<Accounts />}>
        <Route path="edit" element={<Edit />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route path="/direct/inbox" element={<ProtectedRoute><Direct /></ProtectedRoute>}>
        <Route index element={<DefaultMainDirect />} />
        <Route path=":conversationId" element={<UserMainDirect />} />
      </Route>

      <Route path="/:nickname" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
        <Route index element={<PostsDefault />} />
        <Route path="/:nickname/saved" element={<Saved />} />
        <Route path="/:nickname/tagged" element={<Tagged />} />
      </Route>
    </Routes>
  )
}

export default App
