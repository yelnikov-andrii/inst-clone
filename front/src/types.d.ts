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
}

interface MyInfoI {
    avatar: string;
    showRecommendations: boolean;
    website: string;
    bio: string;
    gender: string;
}