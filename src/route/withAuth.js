import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { store } from "../store/index";

export default function withAuth(ComponentToProtect) {
    return class auth extends Component {
        constructor() {
            super();
        }

        render() {
            let User = store.getState() && store.getState().loginReducer;
            if (Object.keys(User.loginUser).length == 0)
                return <Redirect to="/" />;
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    };
}