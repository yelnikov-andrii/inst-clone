import { CameraIcon } from "../icons"
import InlineButton from "../ui/InlineButton"

const PostsDefault = () => {
  return (
    <div className='flex justify-center items-center flex-col mt-10'>
      <CameraIcon />
      <p className="font-extrabold text-3xl mb-10">
        Поширити світлини
      </p>
      <p className="text-sm text-black mb-6">
        Після поширення світлини відображатимуться у вашому профілі.
      </p>
      <InlineButton title="Поширте свою першу світлину" onClick={() => {console.log('load post')}}/>
    </div>
  )
}

export default PostsDefault