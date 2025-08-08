const DateCreated = ({ createdAt, mini }: { createdAt: string, mini?: boolean }) => {
    return (
        <p className="text-[12px] mt-1 text-ig-secondary-text">
            {(() => {
                const createdAtNew = new Date(createdAt);
                const now = new Date();

                const diffTime: number = Math.abs(now - createdAtNew);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                if (!diffDays) {
                    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

                    if (!diffHours) {
                        const diffMinutes = Math.floor(diffTime / (1000 * 60));

                        return mini ? `${diffMinutes} хв.` : `${diffMinutes} хвилин тому`
                    }

                    return mini ? `${diffHours} г.` : `${diffHours} годин тому`
                }

                return mini ? `${diffDays} дн.` : `${diffDays} днів тому`;
            })()}
        </p>
    )
}

export default DateCreated