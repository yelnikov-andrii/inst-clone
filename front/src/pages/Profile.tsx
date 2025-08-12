import { Outlet, useParams } from "react-router"
import Sidebar from "../components/layout/Sidebar"
import Tabs from "../components/profile/Tabs"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { useGetAllInfoAboutUser } from "../hooks/profile/useGetAllInfoAboutUser"
import Info from "../components/profile/Info"
import GlobalLoader from "../components/common/GlobalLoader"
import ErrorPage from "./ErrorPage"

const Profile = () => {
  const { nickname } = useParams();
  const me = useSelector((state: RootState) => state.auth.user);
  const { profileInfo, loading } = useGetAllInfoAboutUser(nickname);

  console.log(profileInfo, 'profile info')

  const isMyProfile = me?.nickname === nickname;

  if (loading) {
    return (
      <section className='flex flex-col md:flex-row'>
        <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
          <Sidebar />
        </div>
        <div className='grow-1'>
          <main className='py-6 px-3'>
            <GlobalLoader />
          </main>
        </div>
      </section>
    )
  }


  if (!profileInfo && !loading) {
    return (
      <ErrorPage />
    )
  }

  return (
    <section className='flex flex-col md:flex-row'>
      <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
        <Sidebar />
      </div>
      <div className='grow-1'>
        <main className='py-6 px-3'>
          <div className="mx-auto max-w-[935px] w-full mb-10">
            <Info
              profileInfo={profileInfo}
              isMyProfile={isMyProfile}
            />
          </div>
          <Tabs
            isMyProfile={isMyProfile}
            nickname={nickname}
          />
          <Outlet
            context={{ isMyProfile, profileInfo }}
          />
        </main>
      </div>
    </section>
  )
}

export default Profile