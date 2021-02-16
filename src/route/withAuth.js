import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { store } from "../store/index";

export default function withAuth(ComponentToProtect) {
    return class auth extends Component {
        constructor() {
            super();
        }

        render() {
            let loading = true;
            let redirect = false;

            let User = store.getState() && store.getState().loginReducer;
            /*if(User.loginSuccess && User.user.auth){
                loading = false;
            }else{
                loading = false;
                redirect = true;
            }

            if (loading) {
                return null;
            }
            if (redirect) {

                return <Redirect to="/" />;
            }*/
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    };
}