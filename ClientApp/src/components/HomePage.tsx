import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Fab, makeStyles } from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../store";
import { getQuestions } from "../service";
import Question from "./Question";
import { useAuth0 } from "@auth0/auth0-react";

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

const HomePage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.questions);
    const isLoading = useSelector((state: RootState) => state.ui.loading);

    const { isAuthenticated } = useAuth0();

    React.useEffect(() => {
        questions.length === 0 && getQuestions().then(data => {
            dispatch(actions.questions.load(data));
            dispatch(actions.ui.setLoading(false));
        });
    }, [dispatch, questions.length]);
    return (
        <div className={classes.root}>
            {isLoading ?
                <div className={classes.progress}><CircularProgress /></div> :
                questions.map(model => <Question model={{ ...model, created: new Date(model.created) }} key={model.questionId} />)
            }
            <Fab variant="extended" className={classes.fab} component={RouterLink} to="/ask" disabled={ !isAuthenticated}>
                <PostAddIcon className={classes.extendedIcon}/>
                Ask
            </Fab>
        </div>
    )
}

export default HomePage;