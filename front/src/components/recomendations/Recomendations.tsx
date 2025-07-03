import { Link } from "react-router"
import UserIcon from '../../images/user-icon.jpg';
import UserSecond from '../../images/postcard1.jpg';
import UserThird from '../../images/postcard2.jpg';
import UserFourth from '../../images/postcard3.jpg';
import clsx from "clsx";

const Recomendations = ({ mini }: { mini?: boolean }) => {
    const users = [
        {
            id: 1,
            icon: UserIcon,
            nickname: 'nickname1',
            fullname: 'Full Name One',
        },
        {
            id: 2,
            icon: UserSecond,
            nickname: 'nickname2',
            fullname: 'Full Name Two',
        },
        {
            id: 3,
            icon: UserThird,
            nickname: 'nickname3',
            fullname: 'Full Name Three',
        },
        {
            id: 4,
            icon: UserFourth,
            nickname: 'nickname4',
            fullname: 'Full Name Four',
        },
    ];
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
                {users.map(user => (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center">
                            <img
                                src={user.icon}
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
                        <button className={clsx('transition-colors font-medium', {
                            'text-ig-primary-button hover:text-ig-link text-[12px]': mini,
                            'text-white bg-ig-primary-button hover:bg-ig-primary-button-hover text-sm py-1 px-2 rounded-md': !mini
                        })}>
                            Стежити
                        </button>
                    </div>
                ))}
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