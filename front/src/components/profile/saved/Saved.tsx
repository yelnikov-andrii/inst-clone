import { useSelector } from 'react-redux';
import { useGetPostsSaved } from '../../../hooks/saved/useGetPostsSaved';
import Globalsnackbar from '../../common/Globalsnackbar';
import SavedDefault from './SavedDefault';
import SavedExists from './SavedExists';
import type { RootState } from '../../../app/store';
import { Navigate, useParams } from 'react-router';

const Saved = () => {
    const { savedPosts, error } = useGetPostsSaved();
    const user = useSelector((state: RootState) => state.auth.user);
    const { nickname } = useParams();


    if (user?.nickname !== nickname) {
        return (
            <Navigate to={`/${nickname}`} replace />
        )
    }


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