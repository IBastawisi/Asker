export interface QuestionData {
    questionId: string;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers?: AnswerData[];
}

export interface QuestionServerData {
    questionId: string;
    title: string;
    content: string;
    userName: string;
    created: string;
    answers?: AnswerData[];
}

export interface PostQuestionData {
    userName?: string,
    title: string;
    content: string;
}

export interface AnswerData {
    answerId: string;
    content: string;
    userName: string;
    created: Date;
}

export interface AnswerServerData {
    questionId: string;
    answerId: string;
    content: string;
    userName: string;
    created: string;
}

export interface PostAnswerData {
    userName?: string,
    questionId: string;
    content: string;
}
