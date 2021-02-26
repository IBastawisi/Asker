import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { postQuestion } from '../service';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { actions } from '../store';
import { useAuth0 } from '@auth0/auth0-react';
import { PostQuestionData, QuestionServerData } from '../types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5rem',
        padding: theme.spacing(1),
        alignSelf: 'center',
        textAlign: 'center',
        '& h2': {
            marginBlock: theme.spacing(1),
        },
        '& .MuiTextField-root': {
            marginBlock: theme.spacing(1),
        },
    },
    submitRow: {
        justifyContent: 'space-around',
        '& button': {
            flexGrow: 1,
        },
    },
}));

export default function AskPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    const [state, setState] = React.useState({
        title: '',
        content: '',
        anonymous: false
    })
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> , checked?: boolean ) => {
        setState({ ...state, [event.target.name]: checked !== undefined ? checked : event.target.value })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const questionData: PostQuestionData = {
            title: state.title,
            content: state.content
        }
        if (!state.anonymous) questionData.userName = user.name;

        postQuestion(questionData).then((question: QuestionServerData | undefined) => {
            if (question) {
                dispatch(actions.questions.add(question))
                history.push(`/questions/${question.questionId}`);
            }
        });
    };

    return (<div className={classes.root} >
        <Typography variant="h5" component="h2">Ask a question</Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={state.title}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
                fullWidth
            />
            <TextField
                label="Content"
                name="content"
                value={state.content}
                onChange={handleChange}
                multiline
                required
                rows={4}
                variant="outlined"
                size="small"
                fullWidth
            />
            <FormGroup row className={classes.submitRow}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.anonymous}
                            onChange={handleChange}
                            disabled={!isAuthenticated}
                            name="anonymous"
                            color="primary"
                        />
                    }
                    label="Anonymous"
                />
            <Button variant="contained" color="primary" type="submit" disabled={!isAuthenticated}>submit</Button>
            </FormGroup>
        </form>
    </div>
    );
}