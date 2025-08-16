import { Link } from "react-router"
import clsx from "clsx";
import { useGetRecommendations } from "../../hooks/recommendations/useGetRecommendations";
import Loader from "../ui/Loader";
import { createProfileUrl } from "../../utils/createProfileUrl";
import UserIcon from '../../images/user-icon.jpg'
import { useFollowUser } from "../../hooks/subscribes/useFollowUser";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useMemo } from "react";

const Recomendations = ({ mini }: { mini?: boolean }) => {
    const { followUser, followSuccess } = useFollowUser();
    const { recommendations, loading, errorRecommendations } = useGetRecommendations(followSuccess);
    const me = useSelector((state: RootState) => state.auth.user);

    const filteredRecommendations = useMemo(() => {
        return recommendations?.filter(user => user.id !== me?.id);
    }, [me, recommendations])

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    if (errorRecommendations) {
        return (
            <div>
                <p className="text-red-500 font-medium text-center">
                    {errorRecommendations}
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <b className={clsx({
                    'text-sm text-ig-secondary-text': mini,
                    'text-black': mini
                })}>
                    Рекомендовані для вас
                </b>
                {mini && (
                    <Link to="/explore/people" className="text-[12px] font-medium">
                        Переглянути всіх
                    </Link>
                )}
            </div>
            <div className="mb-2 flex flex-col gap-6">
                {filteredRecommendations?.slice(0, 5).map((user: UserI) => {
                    const avatarUrl = createProfileUrl(user?.insta_user_info?.avatar);
                    return (
                        <div className="flex justify-between items-center" key={user.id}>
                            <div className="flex gap-1 items-center">
                                <img
                                    src={avatarUrl ? avatarUrl : UserIcon}
                                    className="w-[44px] h-[44px] object-cover rounded-full"
                                />
                                <div className="flex flex-col gap-[2px]">
                                    <b className="font-semibold text-sm">
                                        {user.nickname}
                                    </b>
                                    {!mini && (
                                        <p className="text-ig-secondary-text text-[12px]">
                                            {user.fullname}
                                        </p>
                                    )}
                                    <p className="text-ig-secondary-text text-[12px]">
                                        Стежить хтось
                                    </p>
                                </div>
                            </div>
                            <button
                                className={clsx('transition-colors font-medium', {
                                    'text-ig-primary-button hover:text-ig-link text-[12px]': mini,
                                    'text-white bg-ig-primary-button hover:bg-ig-primary-button-hover text-sm py-1 px-2 rounded-md': !mini
                                })}
                                onClick={() => {
                                    followUser(user.id);
                                }}
                            >
                                Стежити
                            </button>
                        </div>
                    )
                })}
            </div>
            {!mini && (
                <Link to="/explore/people" className="text-[12px] text-ig-primary-button hover:text-ig-link">
                    Переглянути всі рекомендації
                </Link>
            )}
        </div>
    )
}

export default Recomendations