import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnswerServerData, QuestionServerData } from './types'

const initialState = {
    questions: [] as QuestionServerData[],
    answers: {} as { [key: string]: AnswerServerData[] },
    ui: {
        loading: true, announcement: null as { message: string } | null
    }
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState: initialState.questions,
    reducers: {
        load: (state, action: PayloadAction<QuestionServerData[]>) => state.concat(action.payload),
        add: (state, action: PayloadAction<QuestionServerData>) => {
            state.push(action.payload);
        },
        update: (state, action: PayloadAction<QuestionServerData>) => {
            return state.map(q => q.questionId === action.payload.questionId ? { ...q, ...action.payload } : q)
        },
        delete: (state, action: PayloadAction<string>) => {
            state.filter(q => q.questionId !== action.payload);
        },
    }
})

const answersSlice = createSlice({
    name: 'answers',
    initialState: initialState.answers,
    reducers: {
        load: (state, action: PayloadAction<AnswerServerData[]>) => action.payload.reduce(
            (acc, answer) => {
                let key = answer.questionId
                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(answer);
                return acc;
            }, {} as { [key: string]: AnswerServerData[] }),

        add: (state, action: PayloadAction<AnswerServerData>) => {
            if (state[action.payload.questionId]) {
                state[action.payload.questionId].push(action.payload)
            } else {
                state[action.payload.questionId] = [action.payload];
            }
        },
    }
})

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState.ui,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        announce: (state, action) => {
            state.announcement = action.payload
        },
        clearAnnouncement: (state) => {
            state.announcement = null
        }

    }
})

const reducer = {
    questions: questionsSlice.reducer,
    answers: answersSlice.reducer,
    ui: uiSlice.reducer,
}

export const actions = {
    questions: questionsSlice.actions,
    answers: answersSlice.actions,
    ui: uiSlice.actions,
}

const store = configureStore({ reducer })
export type RootState = ReturnType<typeof store.getState>
export default store