interface RegistrationDataI {
    nickname: string;
    login: string;
    password: string;
    fullname: string;
}

interface MessageI {
    id: number;
    senderId: number;
    recipientId: number;
    text: string;
    created: string;
}

interface UserI {
    id: number;
    fullname: string;
    nickname: string;
    avatar: string;
    insta_user_info: MyInfoI
}

interface MyInfoI {
    avatar: string;
    showRecommendations: boolean;
    website: string;
    bio: string;
    gender: string;
}

interface PostMediaI {
    id: number;
    filename: string;
    type: string;
    postId: number;
}

interface PostI {
    userId: number;
    description: string;
    id: number;
    createdAt: string;
    post_media: PostMediaI[];
    Insta_User: UserI
}

interface LikeInterface {
    postId: number;
    userId: number;
    id: number;
}

interface SavedPostI {
    id: number;
    insta_post: PostI;
    postId: number;
    userId: number;
}

interface CommentI {
    id: number;
    text: string;
    userId: number;
    Insta_User: UserI;
    createdAt: string;
}

interface FeedUserInfoI {
    avatar: string;
    id: number;
}

interface FeedUserI {
    fullname: string;
    nickname: string;
    id: number;
    insta_user_info: FeedUserInfoI | null;
}

interface FeedItemI {
    Insta_User: FeedUserI;
    description: string;
    id: number;
    post_media: PostMediaI[];
    userId: number;
    createdAt: string;
    comment_insts: CommentI[]
}

interface UserInfoI {
    avatar: string;
    bio: string;
}

interface ProfileInfoI {
    id: number;
    createdAt: string;
    fullname: string;
    nickname: string;
    insta_posts: PostI[];
    insta_user_info: UserInfoI
}

interface FollowI {
    followerId: number;
    followingId: number;
    id: number;
}

interface SubscriberI extends UserI {
    insta_followers: FollowI;
}

interface FollowingUserI {
    id: number;
    fullname: string;
    Followers: SubscriberI[];
    nickname: string;
}
interface FollowerUserI {
    id: number;
    fullname: string;
    Following: SubscriberI[];
    nickname: string;
}

interface ChatI {
    Recipient: UserI;
    Sender: UserI;
    id: number;
    recipientId: number;
    senderId: number;
    inst_messages: MessageI[];
}