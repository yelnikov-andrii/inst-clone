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


function App() {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />
      <Route path="/accounts/emailsignup" element={<SignUp />} />
      <Route path="/accounts/login" element={<Login />} />
      <Route path="/direct/inbox" element={<Direct />}>
        <Route index element={<DefaultMainDirect />} />
        <Route path=":conversationId" element={<UserMainDirect />} />
      </Route>
      <Route path="/:nickname" element={<Profile />}>
      <Route index element={<PostsDefault />} />
      <Route path="/:nickname/saved" element={<Saved />} />
      <Route path="/:nickname/tagged" element={<Tagged />} />
      </Route>
    </Routes>
  )
}

export default App
