import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AskPage from './components/AskPage';
import SearchPage from './components/SearchPage';
import { makeStyles } from '@material-ui/core';
import QuestionPage from './components/QuestionPage';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <Header />
                <Switch>
                    <Redirect from="/home" to="/" />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/ask" component={AskPage} />
                    <Route path="/search" component={SearchPage} />
                      <Route path="/questions/:questionId" component={QuestionPage} />
                    {/*
                      <Route component={NotFoundPage} />
                    */}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
