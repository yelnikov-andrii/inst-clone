import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { useEffect } from "react";
import { logIn, setAuthLoaded } from "./features/auth/authSlice";
import GlobalLoader from "./components/common/GlobalLoader";
import { useGetMe } from "./hooks/auth/useGetMe";
import AppRoutes from "./appRoutes/AppRoutes";


function App() {
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
    <AppRoutes />
  )
}

export default App
