import { useDispatch, useSelector } from "react-redux"
import { CameraIcon } from "../../icons"
import InlineButton from "../../ui/InlineButton"
import type { RootState } from "../../../app/store"
import { openModal } from "../../../features/modal/modalSlice"
import CreatePostModal from "../../common/CreatePostModal"

const PostsDefault = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();


  return (
    <div className='flex justify-center items-center flex-col mt-10'>
      <CameraIcon />
      <p className="font-extrabold text-3xl mb-10">
        Поширити світлини
      </p>
      <p className="text-sm text-black mb-6">
        Після поширення світлини відображатимуться у вашому профілі.
      </p>
      <InlineButton title="Поширте свою першу світлину" onClick={() => dispatch(openModal())} />
      {isOpen && (
        <CreatePostModal onClose={() => {}}/>
      )}
    </div>
  )
}

export default PostsDefault