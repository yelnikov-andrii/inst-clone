import { useDispatch, useSelector } from "react-redux"
import { ArrowDown, NewMessageIcon } from "../icons"
import { openModal } from "../../features/modal/modalSlice";
import SearchInput from "../layout/SearchInput";
import type { RootState } from "../../app/store";
import ModalForm from "../modalForm/ModalForm";
import UserIcon from '../../images/user-icon.jpg'
import UsersList from "./UsersList";

const Inbox = ({ width }: { width: number }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);



  function handleOpen() {
    dispatch(openModal());
  }
  return (
    <>
      <div className='fixed translate-x-[72px] left-0 top-0 bottom-0 bg-white rounded-xl border border-ig-stroke py-4 px-3 flex flex-col'
        onClick={(e) => e.stopPropagation()}
        style={{ width: `${width}px` }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1">
            <b className="text-lg text-black">
              nickname
            </b>
            <button onClick={handleOpen}>
              <ArrowDown />
            </button>
          </div>
          <button>
            <NewMessageIcon />
          </button>
        </div>
        <div className="mb-10">
          <SearchInput />
        </div>
        <div className="flex flex-col mb-4">
          <img
            src={UserIcon}
            alt="User icon"
            className="w-[74px] h-[74px] rounded-full"
          />
          <p className="text-ig-secondary-text mt-2">
            Ваша нотатка
          </p>
        </div>
        <div className="overflow-y-auto grow">
          <UsersList />
        </div>
      </div>
      {
        isOpen && (
          <ModalForm />
        )
      }
    </>
  )
}

export default Inbox