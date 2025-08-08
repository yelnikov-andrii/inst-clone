interface RegistrationDataI {
    nickname: string;
    login: string;
    password: string;
    fullname: string;
}

interface MessageI {
    id: number;
    sender_id: number;
    text: string;
    created: string;
}

interface ConversationI {
    id: number;
    sender_one_id: number;
    sender_two_id: number;
    messages: MessageI[];
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