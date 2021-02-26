import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Button, CircularProgress, debounce } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setToken } from '../service';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        flexShrink: 0,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginInline: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    avatar: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        marginInline: theme.spacing(1),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const { loginWithRedirect, user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
    const [search, setSearch] = React.useState<string|null>(null);

    React.useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "asker.eu.auth0.com";

            try {
                if (isAuthenticated) {
                    const accessToken = await getAccessTokenSilently({
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                    });
                    setToken(accessToken)
                }
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [isAuthenticated, getAccessTokenSilently]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search != null) {
            if (search?.trim().length > 0) {
                history.push(`/search?search=${search}`);
            } else {
                history.push('/');
            }
        }
    };

    React.useEffect(() => {
        if (search != null) {
            if (search.trim().length > 0) {
                debounce(() => history.push(`/search?search=${search}`), 500)();
            } else {history.push('/')}
        }
    }, [search, history])

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component={RouterLink} to="/" className={classes.title} variant="h6" noWrap>Asker</Typography>
                <form className={classes.search} onSubmit={handleSearchSubmit}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={search||''}
                        onChange={e=> setSearch(e.target.value)}
                    />
                </form>
                <div className={classes.grow} />
                {isLoading ? <CircularProgress color="secondary" size={32} /> :
                    isAuthenticated ? <>
                        <Avatar alt={user.name} src={user.picture} className={classes.avatar} />
                        <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
                    </> :
                        <Button color="inherit" onClick={loginWithRedirect}>Login</Button>
                }
            </Toolbar>
        </AppBar>

    );
}
