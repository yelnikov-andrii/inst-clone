const DateCreated = ({ post, mini }: { post: PostI, mini?: boolean }) => {
    return (
        <p className="text-sm mt-1 text-ig-secondary-text">
            {(() => {
                const createdAt = new Date(post.createdAt);
                const now = new Date();

                const diffTime: number = Math.abs(now - createdAt);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                return mini ? `${diffDays} дн.` : `${diffDays} днів тому`;
            })()}
        </p>
    )
}

export default DateCreated