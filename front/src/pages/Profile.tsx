import { Outlet } from "react-router"
import Sidebar from "../components/layout/Sidebar"
import Info from "../components/profile/Info"
import Tabs from "../components/profile/Tabs"

const Profile = () => {
  return (
    <section className='flex flex-col md:flex-row'>
      <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
        <Sidebar />
      </div>
      <div className='grow-1'>
        <main className='py-6 px-3'>
          <div className="mx-auto max-w-[935px] w-full mb-10">
            <Info />
          </div>
          <Tabs />
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Profile