const PostComment = ({ comment }: { comment: any }) => {
    console.log(comment, 'com')
  return (
    <div className='flex gap-1 text-sm'>
        <b className="font-semibold mr-1">
            {comment?.['Insta_User.nickname']}
        </b>
        {comment?.text}
    </div>
  )
}

export default PostComment