import './main.scss'
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Header from './main.components/header/header'
import { IsMobileWidth } from 'components/utils/util'
import SideBar from './main.components/sidebar/sidebar'
import { withRouter } from 'react-router';


import { auth } from './../../firebase'
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    contentResponsive: {
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    appBarSpacer: theme.mixins.toolbar
}));

function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const mobileWidth = IsMobileWidth()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     props.findSingleUser(window.localStorage.getItem("token") && JSON.parse(window.localStorage.getItem("token")).localId ? JSON.parse(window.localStorage.getItem("token")).localId : props.auth && props.auth.user_id)
    //     props.getProfile(window.localStorage.getItem("token") && JSON.parse(window.localStorage.getItem("token")).localId ? JSON.parse(window.localStorage.getItem("token")).localId : props.auth && props.auth.user_id)
    //     if (!props.auth) {
    //         props.history.push("/login")
    //     }
    // }, [])

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user) {
                props.history.push("/login")
            }
        })
    }, [])


    return (
        <div className={classes.root} id="main">
            <Header
                open={open}
                {...props}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />
            

            <main className={mobileWidth ? classes.contentResponsive : classes.content}>
                <div className={classes.appBarSpacer}></div>
                {props.children}
            </main>
        </div>
    );
}

export default withRouter(MiniDrawer)