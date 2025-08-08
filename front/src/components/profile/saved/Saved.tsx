import { useGetPostsSaved } from '../../../hooks/saved/useGetPostsSaved';
import Globalsnackbar from '../../common/Globalsnackbar';
import SavedDefault from './SavedDefault';
import SavedExists from './SavedExists';

const Saved = () => {
    const { savedPosts, error } = useGetPostsSaved();

    return (
        <div className='pt-10 pb-6'>
            {savedPosts.length > 0 ? <SavedExists post={savedPosts[0]} /> : (
                <SavedDefault />
            )}
            {error && (
                <Globalsnackbar text={error} />
            )}

        </div>
    )
}

export default Saved