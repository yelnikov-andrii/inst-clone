
const FollowersInfo = ({ profileInfo }: { profileInfo: ProfileInfoI | undefined }) => {
    const posts = profileInfo?.insta_posts;

    let postsStr = "";

    const postsCount = posts?.length || 0;
    const postsCountStr = postsCount.toString();
    const lastDigit = +postsCountStr[postsCountStr.length - 1];

    switch (lastDigit) {
        case 1:
            postsStr = 'допис';
            break;
        case 2:
        case 3:
        case 4:
            postsStr = 'дописи';
            break;
        default:
            postsStr = 'дописів';
    }

    return (
        <div className='flex gap-6'>
            <p>
                <b className='text-black font-bold'>{posts?.length || 0}</b> <span className='text-ig-secondary-text'>{postsStr}</span>
            </p>
            <p>
                <span className='text-ig-secondary-text'>Читачі: </span> <b className='text-black font-bold'>8</b>
            </p>
            <p>
                <span className='text-ig-secondary-text'>Стежить: </span> <b className='text-black font-bold'>4</b>
            </p>
        </div>
    )
}

export default FollowersInfo