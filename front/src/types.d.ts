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