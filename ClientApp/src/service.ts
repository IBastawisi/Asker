import { AnswerServerData, PostAnswerData, PostQuestionData, QuestionServerData } from "./types";

let token: string;

export const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

export const getQuestions = async (): Promise<Omit<QuestionServerData, 'answers'>[]> => {
    try {
        const response = await fetch('/api/questions');
        const result: QuestionServerData[] = await response.json();
        return result

    } catch (ex) {
        console.error(ex);
        return [];
    }
};

export const getUnansweredQuestions = async (): Promise<Omit<QuestionServerData, 'answers'>[]> => {
    try {
        const response = await fetch('/api/questions/unanswered');
        const result: QuestionServerData[] = await response.json();
        return result

    } catch (ex) {
        console.error(ex);
        return [];
    }
};

export const getQuestion = async (questionId: string): Promise<QuestionServerData | null> => {
    try {
        const response = await fetch(`/api/questions/${questionId}`);
        const result: QuestionServerData = await response.json();

        return result;
    } catch (ex) {
        console.error(ex);
        return null;
    }
};

export const searchQuestions = async (criteria: string): Promise<Omit<QuestionServerData, 'answers'>[]> => {
    try {
        const response = await fetch('/api/questions?search=' + criteria);
        const result: QuestionServerData[] = await response.json();

        return result;
    } catch (ex) {
        console.error(ex);
        return [];
    }
};

export const postQuestion = async (question: PostQuestionData): Promise<QuestionServerData | undefined> => {
    try {
        //question.userName == store.getState().user?.name;
        const response = await fetch('/api/questions', {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const result: QuestionServerData = await response.json();

        return result;
    } catch (ex) {
        console.error(ex);
        return undefined;
    }
};

export const getAnswers = async (questionId: string): Promise<AnswerServerData[] | null> => {
    try {
        const response = await fetch(`/api/questions/${questionId}/answers`);
        const result: AnswerServerData[] = await response.json();

        return result;
    } catch (ex) {
        console.error(ex);
        return null;
    }
};


export const postAnswer = async (answer: PostAnswerData): Promise<AnswerServerData | undefined> => {
    try {
        const response = await fetch('/api/questions/answer', {
            method: 'post',
            body: JSON.stringify(answer),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const result: AnswerServerData = await response.json();

        return result;
    } catch (ex) {
        console.error(ex);
        return undefined;
    }
};
