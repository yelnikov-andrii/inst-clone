import TaggedDefault from './TaggedDefault';

const Tagged = () => {
  const postsAreExist = false;
  return (
    <div className='pt-10 pb-6'>
      {postsAreExist ? null : (
        <TaggedDefault />
      )}
    </div>
  )
}

export default Tagged