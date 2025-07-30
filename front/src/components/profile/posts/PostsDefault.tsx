import { useDispatch, useSelector } from "react-redux"
import { CameraIcon } from "../../icons"
import InlineButton from "../../ui/InlineButton"
import type { RootState } from "../../../app/store"
import { closeModal, openModal } from "../../../features/modal/modalSlice"
import CreatePost from "./CreatePost"
import Modal from "../../ui/Modal"
import { useState } from "react"

const PostsDefault = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const [areFilesExist, setAreFilesExist] = useState(false);
  const [openDiscard, setOpenDiscard] = useState(false);


  function onCloseModal() {
    if (areFilesExist) {
      setOpenDiscard(true);
    } else {
      dispatch(closeModal());
      setOpenDiscard(false);
    }
  }

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
        <Modal styleProps={{ maxWidth: 700 }} onClose={onCloseModal}>
          <CreatePost setAreFilesExist={setAreFilesExist} openDiscard={openDiscard} setOpenDiscard={setOpenDiscard} />
        </Modal>

      )}
    </div>
  )
}

export default PostsDefault