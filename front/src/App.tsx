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
import { logIn, setAuthLoaded } from "./features/auth/authSlice";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Accounts from "./pages/Accounts";
import Edit from "./components/accounts/edit/Edit";
import Notifications from "./components/accounts/notifications/Notifications";
import GlobalLoader from "./components/common/GlobalLoader";
import PublicRoute from "./components/common/PubliRoute";
import { useGetMe } from "./hooks/useGetMe";


function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthLoaded = useSelector((state: RootState) => state.auth.isAuthLoaded);
  const dispatch = useDispatch();
  const { getUserInfo } = useGetMe();

  useEffect(() => {
    const accessToken = localStorage.getItem('inst_accessToken');
    const userStr = localStorage.getItem('inst_user');
    let user;

    if (userStr) {
      user = JSON.parse(userStr);
    }

    if (accessToken && user) {
      dispatch(logIn({ accessToken, user }))
    } else {
      dispatch(setAuthLoaded());
    }
  }, []);

  useEffect(() => {
    if (user) {
      getUserInfo(user.id);
    }

  }, [user]);

  if (!isAuthLoaded) {
    return (
      <GlobalLoader />
    )
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />

      <Route path="/accounts/emailsignup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/accounts/activation" element={<PublicRoute><Activate /></PublicRoute>} />
      <Route path="/accounts/login" element={<PublicRoute><Login /></PublicRoute>} />

      <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>}>
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
