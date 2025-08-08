import React from 'react'
import { useGetPostsSaved } from '../../../hooks/saved/useGetPostsSaved';
import { Link } from 'react-router';
import { LeftArrow } from '../../icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

const SavedAllPosts = () => {
    const { savedPosts, error } = useGetPostsSaved();
    const nickname = useSelector((state: RootState) => state.auth.user?.nickname);

    return (
        <div>
            <Link to={`/${nickname}/saved`}>
              <LeftArrow />
              <span>
                Збережено
              </span>
            </Link>
        </div>
    )
}

export default SavedAllPosts