import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Queries.scss'

export class Queries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reply: '',
            isReplyDisabled: true
        };
    }

    componentDidMount() {
        console.log('Queries');
    }

    handleOnChange = field => evt => {
        this.setState({
            reply: evt.target.value,
            isReplyDisabled: false
        });
    }

    render() {

        return (

            <div >
                <Grid container spacing={0} justify='flex-start' alignItems='center'>
                    <Grid item xs={12}>
                        <ExpansionPanel>

                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component={'span'} style={{ 'width': '100%' }}>Issue Title 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ 'display': 'block' }}>
                                <Typography component={'div'}>
                                    Category: Education<br/>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.</Typography>
                                    <TextField
                                        id="reply"
                                        label="Reply"
                                        fullWidth
                                        onChange={this.handleOnChange('reply')}
                                        // value={query && query.issue ? query.issue : ''}
                                        required
                                    />

                                    <Button className="reply" variant="contained" color="primary" disabled={this.state.isReplyDisabled}>
                                        Reply</Button>

                            </ExpansionPanelDetails>

                        </ExpansionPanel>
                            {/* <Typography component={'span'} variant="h5"> Queries. No Queries raised! </Typography> */}
                    </Grid>

                    </Grid>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
                };
}

function mapDispatchToProps(dispatch) {
    return {
                }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queries);