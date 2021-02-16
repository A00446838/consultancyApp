import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { validateEmail, validatePassword } from "../../util/utility";
import Grid from '@material-ui/core/Grid';

export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSignUp: false,
            signUpData: this.props.signUpData,
            showPassword: false,
            emailError: '',
            passwordError: '',
        };
    }


    handleOnChange = field => event => {
        let signUpData = this.state.signUpData;

        signUpData[field] = event.target.value;


        let isSignUpDisabled = true;
        if (validateEmail(signUpData.email) && signUpData.name && signUpData.password) {
            isSignUpDisabled = false;
        }

        this.props.enableDisableSignUp(isSignUpDisabled);

        this.setState({
            signUpData
        });
    }


    handleOnBlur = field => event => {
        let signUpData = this.state.signUpData;

        signUpData[field] = event.target.value;

        if (field === 'email') {
            this.setState({
                emailError: event.target.value ? (validateEmail(event.target.value) ? '' : 'Invalid email address') : ''
            });
        } else if (field === 'password') {
            this.setState({
                passwordError: event.target.value ? (validatePassword(event.target.value) ? '' : 'Password should be min 6 characters') : ''
            });
        }
    }



    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    showConsultantTypes = () => {
        let data = this.state.signUpData
        if (data.registerAs == 2) {
            return (
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="consultantType">Service:</InputLabel>
                        <Select
                            labelId="consultantType"
                            id="consultantTypeOpts"
                            value={data && data.consultantType ? data.consultantType : ''}
                            onChange={this.handleOnChange('consultantType')}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Education</MenuItem>
                            <MenuItem value={2}>Career</MenuItem>
                            <MenuItem value={3}>Immigration</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )
        }
    }


    render() {
        let data = this.state.signUpData ? this.state.signUpData : {};
        return (
            <Grid container spacing={0} justify='center' alignItems='center'>
                <Grid item xs={12}>

                    <FormControl fullWidth>
                        <InputLabel id="registerAs">Sign Up As:</InputLabel>
                        <Select
                            labelId="registerAs"
                            id="registerAsOpts"
                            value={data && data.registerAs ? data.registerAs : ''}
                            onChange={this.handleOnChange('registerAs')}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>User</MenuItem>
                            <MenuItem value={2}>Consultant</MenuItem>
                        </Select>
                    </FormControl>

                    {this.showConsultantTypes()}

                    <TextField
                        id="name"
                        label="Name"
                        fullWidth
                        onChange={this.handleOnChange('name')}
                        value={data && data.name ? data.name : ''}
                        InputProps={{
                            autoComplete: 'new-password'
                        }}
                        required
                    />
                    <TextField
                        id="email"
                        label="Email"
                        fullWidth
                        onChange={this.handleOnChange('email')}
                        onBlur={this.handleOnBlur('email')}
                        value={data && data.email ? data.email : ''}
                        InputProps={{
                            autoComplete: 'new-password'
                        }}
                        error={this.state.emailError ? this.state.emailError : ''}
                        helperText={this.state.emailError ? this.state.emailError : ''}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        fullWidth
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.handleOnChange('password')}
                        onBlur={this.handleOnBlur('password')}
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
                            </InputAdornment>,
                            autoComplete: 'new-password'
                        }}
                        error={this.state.passwordError ? this.state.passwordError : ''}
                        helperText={this.state.passwordError ? this.state.passwordError : ''}
                        required
                    />
                </Grid>
            </Grid>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);