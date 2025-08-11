import type { Dispatch, Ref, SetStateAction } from "react";
import { useCreateComment } from "../../hooks/comments/useCreateComment";
import InlineButton from "../ui/InlineButton"
import Loader from "../ui/Loader"
import Globalsnackbar from "../common/Globalsnackbar";

const CreateCommentForm = ({ postId, setCommentWasCreated, inputRef }: { postId: number, setCommentWasCreated: Dispatch<SetStateAction<boolean>>, inputRef?: Ref<HTMLTextAreaElement> | undefined }) => {
    const { createComment, loading, error: errorComment, text, setText } = useCreateComment(setCommentWasCreated);

    function hadnleCreateComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createComment(postId);
        setTimeout(() => {
            setCommentWasCreated(false);
        }, 1000);
    }

    return (
        <>
            <form className='mt-2 relative h-8' onSubmit={hadnleCreateComment}>
                <textarea
                    className='w-full pr-20 placeholder:text-ig-secondary-text p-1 h-full'
                    placeholder='Додайте коментар...'
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                    ref={inputRef}
                />
                <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <InlineButton title={loading ? <><Loader /></> : 'Опублікувати'} type="submit" disabled={!text} onClick={() => { }} />
                </div>
            </form>
            {errorComment && (
                <Globalsnackbar text={errorComment} />
            )}
        </>
    )
}

export default CreateCommentForm