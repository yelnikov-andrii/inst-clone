import React from 'react'
import SavedDefault from './SavedDefault';

const Saved = () => {
    const postsAreExist = false;
    return (
        <div className='pt-10 pb-6'>
            {postsAreExist ? null : (
                <SavedDefault />
            )}
        </div>
    )
}

export default Saved