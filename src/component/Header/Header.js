import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from "../../store/actions/LoginAction";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    root: {
        position: "absolute",
        right: 0
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        margin: "10px 30px 10px 10px",
        paddingLeft: "16px",
        right: 0,
        position: "relative",
        width: "100%",
        background: "transparent"
    },
    buttonCollapse: {
        margin: "10px",
        boxShadow: "none"
    }
});


export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            userAuth: {},
            anchorEl: null
        };
    }


    componentDidMount() {

    }

    logout = () => {
        this.setState({ anchorEl: null });
        this.props.logout(this.onLogoutSuccess);
    }

    onLogoutSuccess = () => {
        this.props.history.push('/');
    }

    handleMenuClick = () => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {

        const { classes } = this.props;

        const { anchorEl } = this.state;
        const open = Boolean(this.state.anchorEl);

        let isSignedIn = this.props.loginSuccess && this.props.loginSuccess.hasOwnProperty('token');

        return (

            <div className={'header'}>
                <Container maxWidth="lg">
                    <Grid container spacing={10}>
                        <AppBar position="fixed">
                            <Toolbar>
                                <Grid container spacing={10} direction='row' justify='flex-start' alignItems='flex-start'>
                                    <Grid item xs={5}>
                                        <Typography component={'span'} variant="h6">
                                            <Link color="inherit" href="/" underline={'none'}>
                                                Consultancy App
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {isSignedIn &&
                                    <Grid container spacing={10} direction='row' justify='center' alignItems='center'>
                                        <div className={classes.root}>

                                            <div className={classes.buttonBar}>
                                                <IconButton
                                                    edge="start"
                                                    onClick={this.logout}
                                                    color="inherit"
                                                >
                                                    <ExitToAppIcon />
                                                </IconButton>
                                                <Menu
                                                    id="account-menu"
                                                    anchorEl={anchorEl}
                                                    getContentAnchorEl={null}
                                                    keepMounted
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={open}
                                                    onClose={this.handleMenuClose}
                                                >
                                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                                </Menu>
                                            </div>
                                        </div>
                                    </Grid>
                                }

                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Container>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.loginReducer.loginSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: (onLogoutSuccess) => dispatch(logout(onLogoutSuccess))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));