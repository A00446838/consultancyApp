import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <Grid container spacing={0} justify='flex-start' alignItems='center'>
                <Grid item xs={12}>
                    <Card >
                        <CardContent className="loginCardContentPadding">
                            <Typography variant="body1" gutterBottom>
                                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.  </Typography>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>


        )
    }

}

export default Reports;
