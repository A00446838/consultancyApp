import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import './ModalComponent.scss';
import Zoom from '@material-ui/core/Zoom';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography component={'span'} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        height: 'auto',
        padding: theme.spacing(2),
        maxHeight: '500px'
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class ModalComponent extends React.Component {
    state = {
        open: false,
    };

    onClose = () => {
        if(this.props.closeModal){
            this.props.closeModal();
        }
    };

    render() {
        return (
            <Zoom in={this.props.open}>
            <div>
                <Dialog
                    maxWidth={this.props.maxWidth} //values can be "xs","sm","md","lg","xl"
                    aria-labelledby="customized-dialog-title"
                    open={this.props.open}
                    fullWidth
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.onClose}>
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom  component={'span'}>
                            {this.props.children}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        {this.props.buttons}
                    </DialogActions>
                </Dialog>
            </div>
            </Zoom>
        );
    }
}

ModalComponent.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    maxWidth: PropTypes.string,
    title: PropTypes.node,
    buttons: PropTypes.node,
    closeModal: PropTypes.func
};

export default ModalComponent;