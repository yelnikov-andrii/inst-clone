import { useDispatch, useSelector } from "react-redux"
import { ArrowDown, NewMessageIcon } from "../icons"
import { openModal } from "../../features/modal/modalSlice";
import SearchInput from "../layout/SearchInput";
import type { RootState } from "../../app/store";
import ModalForm from "../modalForm/ModalForm";
import Avatar from "../common/Avatar";
import UserImage from '../../images/user-icon.jpg';
import { createProfileUrl } from "../../utils/createProfileUrl";
import ChatList from "./ChatList";

const Inbox = ({ width }: { width: number }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const user = useSelector((state: RootState) => state.auth.user);
  const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);

  function handleOpen() {
    dispatch(openModal());
  }

  const avatarUrl = createProfileUrl(myInfo?.avatar);

  return (
    <>
      <div className='fixed translate-x-[72px] left-0 top-0 bottom-0 bg-white rounded-xl border border-ig-stroke py-4 px-3 flex flex-col'
        onClick={(e) => e.stopPropagation()}
        style={{ width: `${width}px` }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1">
            <b className="text-lg text-black">
              {user?.nickname}
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
          <Avatar src={avatarUrl ? avatarUrl : UserImage} width={74} height={74} />
          <p className="text-ig-secondary-text mt-2">
            Ваша нотатка
          </p>
        </div>
        <div className="overflow-y-auto grow">
          <ChatList />
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