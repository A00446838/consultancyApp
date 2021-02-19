import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { consultantType } from "../../constant/selectOptions";
import { getConsultants } from "../../store/actions/UserProfileAction"

import './Issue.scss'

export class Issue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.user ? this.props.user : {},
            isSubmitDisabled: true
        };
    }

    handleOnChange = field => evt => {
        let query = this.state.query;

        query[field] = evt.target.value;

        this.setState({
            query: query
        });

        if (query && query.issueTitle && query.issue) {
            this.setState({ isSubmitDisabled: false })
        }
    }

    getConsultants = () => {
        this.props.getConsultants()
    }

    submitQuery = () => {
        let params = this.state.query;
    }

    showConsultancyList = () => {
        let query = this.state.query
        let data;
        switch (query.queryType) {
            case 1: data = [{
                value: 1,
                label: "Edu1"
            },
            {
                value: 2,
                label: "Edu2"
            }]
                break;
            case 2: data = [{
                value: 1,
                label: "Cons1"
            },
            {
                value: 2,
                label: "Cons2"
            }]
                break;
            case 3: data = [{
                value: 1,
                label: "Imm1"
            }]
                break;
            default:
                data = []
        }
        if (data && data.length) {
            return (<div style={{ "width": "100%" }}><Grid item xs={12}>
                <TextField
                    id="consultant"
                    label="Consultant"
                    fullWidth
                    onChange={this.handleOnChange('consultant')}
                    value={query && query.consultant ? query.consultant : ''}
                    required
                    select
                >
                    {data.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid></div>)
        }
        else {
            return null;
        }
    }



    render() {
        let query = this.state.query ? this.state.query : {};

        return (

            <div >
                <Grid container spacing={0} justify='flex-start' alignItems='center'>
                    <Grid item xs={12}>
                        <Card >
                            <CardContent className="loginCardContentPadding">
                                <form autoComplete="off">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="queryType"
                                                label="Consultancy Type"
                                                fullWidth
                                                onChange={this.handleOnChange('queryType')}
                                                onClick={this.getConsultants}
                                                value={query && query.queryType ? query.queryType : ''}
                                                required
                                                select
                                            >
                                                {consultantType.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        {this.showConsultancyList()}

                                        <Grid item xs={12}>
                                            <TextField
                                                id="issueTitle"
                                                label="Issue Title"
                                                fullWidth
                                                onChange={this.handleOnChange('issueTitle')}
                                                value={query && query.issueTitle ? query.issueTitle : ''}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="issue"
                                                label="Issue"
                                                fullWidth
                                                onChange={this.handleOnChange('issue')}
                                                value={query && query.issue ? query.issue : ''}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={2}>

                                    <Grid item xs={2}>
                                        <Button variant="contained" color="primary" onClick={this.submitQuery}
                                            disabled={this.state.isSubmitDisabled}>
                                            Submit
                                        </Button>

                                    </Grid>
                                    <Grid item xs={10}>
                                        <Button
                                            className="fr"
                                            variant="contained"
                                            component="label"
                                        >
                                            Upload File
                                            <input
                                                type="file"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>

                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        consultants: state.userReducer.consultants
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getConsultants: () => dispatch(getConsultants())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Issue);