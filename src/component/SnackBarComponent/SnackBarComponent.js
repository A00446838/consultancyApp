import React, { Component } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//import PropTypes from "prop-types";
import MuiAlert from '@material-ui/lab/Alert';


/**
 *
 * Severity can be
 *  <Alert severity="error">This is an error message!</Alert>
    <Alert severity="warning">This is a warning message!</Alert>
    <Alert severity="info">This is an information message!</Alert>
    <Alert severity="success">This is a success message!</Alert>
 * @param props
 * @returns {*}
 * @constructor
 */
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class SnackBarComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        };
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.snackBarClose();
    };


    snackBarClose = () => {
        this.props.snackBarClose();
    };

    render() {
        return(
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.props.open}
                onExit = {this.props.onExitSnackbar}
                autoHideDuration={this.props.autoHideDuration ? this.props.autoHideDuration : 6000} //if anyone wants to give other time for autohide duration
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackBarClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            >
                <Alert onClose={this.handleClose} severity={this.props.severity}>
                    {this.props.message}
                </Alert>

            </Snackbar>
        );
    }
}

/*SnackbarComponent.propTypes = {
    snackBarclose:PropTypes.func,
    open:PropTypes.bool,
    onExitSnackbar:PropTypes.func,
    message:PropTypes.string,
    autoHideDuration:PropTypes.number,
    variant: PropTypes.oneOf(['success','error'])
};*/

export default SnackBarComponent;


