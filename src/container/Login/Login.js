import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { login } from '../../store/actions/LoginAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ModalComponent from "../../component/ModalComponent/ModalComponent";
import Link from '@material-ui/core/Link';
import { SignUp } from "../SignUp/SignUp";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { signUp } from "../../store/actions/SignUpAction";
import SnackBarComponent from "../../component/SnackBarComponent/SnackBarComponent";
import { withRouter } from "react-router-dom";
import { validateEmail } from "../../util/utility";
import Typography from '@material-ui/core/Typography';
import './Login.scss';
import Container from '@material-ui/core/Container';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSignUp: false,
            loginData: {},
            showPassword: false,
            signUpData: {},
            openSnackBar: false,
            message: '',
            severity: '',
            isSingUpDisabled: true,
            isLoginDisabled: true
        };
    }


    showMessage = (message, severity) => {
        this.setState({
            openSnackBar: true,
            message: message,
            severity: severity
        })
    }

    snackBarClose = () => {
        this.setState({
            openSnackBar: false,
            message: '',
            severity: '',
            emailError: ''
        })
    }

    handleOnChange = field => evt => {
        let loginData = this.state.loginData;

        loginData[field] = evt.target.value;

        let isLoginDisabled = true;
        if (validateEmail(loginData.email) && loginData.password) {
            isLoginDisabled = false;
        }

        this.setState({
            loginData,
            isLoginDisabled
        });
    }

    handleOnBlur = field => event => {
        if (field === 'email') {
            this.setState({
                emailError: event.target.value ? (validateEmail(event.target.value) ? '' : 'Invalid email address') : ''
            });
        }

    }

    login = () => {
        this.props.login(this.state.loginData, this.onLoginSuccess, this.onLoginFailure);
    }

    onLoginSuccess = (response) => {
        this.setState({
            loginData: {}
        });

        this.props.history.push('/profile');

    };

    onLoginFailure = (error) => {
        this.showMessage('Invalid email or password', 'error');
    };

    openSignUp = () => {
        this.setState({
            openSignUp: true
        })
    }

    closeModal = () => {
        this.setState({
            openSignUp: false,
            signUpData: {}
        })
    }

    signUpModal = () => {
        if (this.state.openSignUp) {
            return (
                <ModalComponent
                    open
                    maxWidth={'sm'}
                    title={'Sign Up'}
                    closeModal={this.closeModal}
                    buttons={
                        <div>
                            <Button variant="contained" color="primary" onClick={this.onSignUpSuccess}
                                disabled={this.state.isSingUpDisabled}>
                                Continue
                            </Button>
                        </div>
                    }
                >
                    <SignUp
                        signUp={this.onSignUpSuccess}
                        signUpData={this.state.signUpData}
                        enableDisableSignUp={this.enableDisableSignUp}
                    />

                </ModalComponent>
            )
        }
    }

    enableDisableSignUp = (isSingUpDisabled) => {
        this.setState({
            isSingUpDisabled
        });
    }

    signUp = () => {
        this.props.signUp(this.state.signUpData, this.onSignUpSuccess, this.onSignUpFailure);
    }

    onSignUpSuccess = () => {
        this.closeModal();
        this.showMessage('You have been signed up successfully. Please wait for the admin to authorize', 'success');
    };

    onSignUpFailure = () => {
        this.closeModal();
        this.showMessage('Unable to sign you up at this moment, please try again after sometime', 'error');
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    render() {

        let data = this.state.loginData ? this.state.loginData : {};

        return (
            <div style={{ marginTop: '20%' }}>
                <Container maxWidth="sm">
                    <Grid container spacing={0} justify='center' alignItems='center'>
                        <Grid item xs={11}>
                            <Card className="loginCard">
                                <CardHeader title={<Typography component={'span'} variant="h6">Login </Typography>} className="loginCardHeaderPadding" />
                                <CardContent className="loginCardContentPadding">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                fullWidth
                                                onChange={this.handleOnChange('email')}
                                                onBlur={this.handleOnBlur('email')}
                                                value={data && data.email ? data.email : ''}
                                                error={this.state.emailError ? this.state.emailError : ''}
                                                helperText={this.state.emailError ? this.state.emailError : ''}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                fullWidth
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                onChange={this.handleOnChange('password')}
                                                value={data && data.password ? data.password : ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container spacing={2}>

                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" onClick={this.login}
                                                disabled={this.state.isLoginDisabled}>
                                                Login
                                        </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Grid container direction="column" justify="center" alignItems="flex-end">
                                                <Typography component={'span'} variant="body2" className='footer-text-margin'>
                                                    <Link href="#" onClick={this.openSignUp}>
                                                        Create an account
                                                </Link>
                                                </Typography>
                                            </Grid>


                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <SnackBarComponent
                    open={this.state.openSnackBar}
                    message={this.state.message}
                    snackBarClose={this.snackBarClose}
                    severity={this.state.severity}
                />
                {this.signUpModal()}
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
        login: (params, onLoginSuccess, onLoginFailure) => dispatch(login(params, onLoginSuccess, onLoginFailure)),
        signUp: (params, onSignUpSuccess, onSignUpFailure) => dispatch(signUp(params, onSignUpSuccess, onSignUpFailure))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));