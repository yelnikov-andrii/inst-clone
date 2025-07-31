import { Route, Routes } from "react-router"
import Auth from "../pages/Auth"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Home from "../pages/Home";
import Direct from "../pages/Direct";
import DefaultMainDirect from "../components/direct/DefaultMainDirect";
import UserMainDirect from "../components/direct/UserMainDirect";
import Profile from "../pages/Profile";
import Saved from "../components/profile/Saved";
import Tagged from "../components/profile/Tagged";
import Activate from "../pages/Activate";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Accounts from "../pages/Accounts";
import Edit from "../components/accounts/edit/Edit";
import Notifications from "../components/accounts/notifications/Notifications";
import PublicRoute from "../components/common/PubliRoute";
import Posts from "../components/profile/posts/Posts";
import PostPage from "../pages/PostPage";

const AppRoutes = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
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
                <Route index element={<Posts />} />
                <Route path="/:nickname/saved" element={<Saved />} />
                <Route path="/:nickname/tagged" element={<Tagged />} />
            </Route>
            <Route path="p/:postId" element={<ProtectedRoute><PostPage /></ProtectedRoute>}>
            </Route>
        </Routes>
    )
}

export default AppRoutes