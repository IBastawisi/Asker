import React from "react";
import { Link as RouterLink,useParams } from 'react-router-dom';
import { CircularProgress, Fab, makeStyles } from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../store";
import { getQuestion } from "../service";
import Question from "./Question";
import { QuestionServerData } from "../types";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        minHeight: 200,
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    progress: {
        marginTop: '25vh',
        textAlign: 'center',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function QuestionPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { questionId } = useParams<{ questionId: string }>();
    const [question, setQuestion] = React.useState<QuestionServerData | null>(null);
    const isLoading = useSelector((state: RootState) => state.ui.loading);

    React.useEffect(() => {
        getQuestion(questionId).then(data => {
            if (data) {
                setQuestion(data);
                dispatch(actions.ui.setLoading(false));
            }
        });
    }, [questionId, dispatch]);
    return (
        <div className={classes.root}>
            {isLoading ?
                <div className={classes.progress}><CircularProgress /></div> :
                question && <Question model={{ ...question, created: new Date(question.created) }} key={question.questionId} extended />
            }
            <Fab variant="extended" className={classes.fab} component={RouterLink} to="/ask">
            <PostAddIcon className={classes.extendedIcon}/>
                Ask
            </Fab>
        </div>
    )
}