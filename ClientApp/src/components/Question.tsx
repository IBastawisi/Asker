import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { QuestionData } from '../types';
import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { getAnswers, postAnswer } from '../service';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RootState } from '../store';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: theme.spacing(1),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    answerForm: {
        paddingBlock: '2px',
        paddingInlineStart: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.grey[50],
    },
    input: {
        marginInlineEnd: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        margin: 4,
    },
    answer: {
        margin: 4,
        padding: theme.spacing(1),
    },
}));

const Question: React.FC<{ model: QuestionData, extended?: boolean }> = ({ model, extended = false }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    const answers = useSelector((state: RootState) => state.answers[model.questionId]);

    const [showAnswers, setShowAnswers] = React.useState(extended);
    const [answerContent, setAnswerContent] = React.useState('');

    const handleSubmitAnswer: React.FormEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        postAnswer({
            userName: user?.name,
            questionId: model!.questionId,
            content: answerContent,
        }).then(answer => {
            if (answer) {
                dispatch(actions.answers.add(answer))
                setAnswerContent('');
            }
        });
    };

    React.useEffect(() => {
        showAnswers && !answers && getAnswers(model.questionId).then(data => {
            if (data) {
                dispatch(actions.answers.load(data));
            }
        });
    }, [showAnswers, answers, model.questionId, dispatch]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom></Typography>
                <Typography variant="h5" component="h2">{model.title}</Typography>
                <Typography className={classes.pos} color="textSecondary">Asked by {model.userName}</Typography>
                <Typography variant="body2" component="p">{model.content}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? 'Hide' : 'Show'} Answers</Button>
            </CardActions>


            {showAnswers && <div>
                <Paper component="form" className={classes.answerForm} onSubmit={handleSubmitAnswer}>
                    <InputBase
                        className={classes.input}
                        placeholder="Add Yours"
                        inputProps={{ 'aria-label': 'add answer' }}
                        value={answerContent}
                        onChange={e => setAnswerContent(e.target.value)}
                        required
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="submit" disabled={!isAuthenticated}>
                        <SendIcon />
                    </IconButton>
                </Paper>

                {answers?.map(answer =>
                    <React.Fragment key={answer.answerId}><Divider className={classes.divider} /><div key={answer.answerId} className={classes.answer}>
                        <Typography variant="body2" component="p">{answer.userName}</Typography>
                        <Typography variant="body2" component="p">{answer.content}</Typography>
                    </div>
                    </React.Fragment>)}
            </div>}
        </Card>
    );
}

export default Question;