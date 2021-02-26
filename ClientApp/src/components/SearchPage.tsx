import React from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { CircularProgress, Fab, makeStyles } from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../store";
import { searchQuestions } from "../service";
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

export default function SearchPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query: string = new URLSearchParams(useLocation().search).get('search') || '';
    const [questions, setQuestions] = React.useState([] as QuestionServerData[]);
    const isLoading = useSelector((state: RootState) => state.ui.loading);

    React.useEffect(() => {
        searchQuestions(query).then(data => {
            setQuestions(data);
            dispatch(actions.ui.setLoading(false));
        });
    }, [query, dispatch]);
    return (
        <div className={classes.root}>
            {isLoading ?
                <div className={classes.progress}><CircularProgress /></div> :
                questions.map(model => <Question model={{ ...model, created: new Date(model.created) }} key={model.questionId} />)
            }
            <Fab variant="extended" className={classes.fab} component={RouterLink} to="/ask">
            <PostAddIcon className={classes.extendedIcon}/>
                Ask
            </Fab>
        </div>
    )
}