import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import Queries from "../Queries/Queries";
import Reports from "../Reports/Reports";
import Issue from "../Issue/Issue";
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import SnackBarComponent from "../../component/SnackBarComponent/SnackBarComponent";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function tabValues(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    }
});

export class UserHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            query: {},
            user: this.props.loginUser ? this.props.loginUser.user : {},
            openSnackBar: false,
            message: '',
            severity: '',
        };
    }


    componentDidMount() {

    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue});
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


    render() {

        const { classes } = this.props;
        let value = this.state.value;

        let user = (this.props.loginUser && this.props.loginUser.hasOwnProperty('user')) ? this.props.loginUser.user : {};

        console.log('user: ', user);
        return (

            <div style={{marginTop: '10%'}}>
                <Container maxWidth="lg">
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Ask" {...tabValues(0)} />
                        <Tab label="Queries" {...tabValues(1)} />
                        <Tab label="Summary" {...tabValues(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel  value={value} index={0}>
                    <Issue query={this.state.query} showMessage={this.showMessage}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Queries/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Reports/>
                </TabPanel>
                </Container>
                <SnackBarComponent
                    open={this.state.openSnackBar}
                    message={this.state.message}
                    snackBarClose={this.snackBarClose}
                    severity={this.state.severity}
                />
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        loginUser: state.loginReducer.loginUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserHomePage));