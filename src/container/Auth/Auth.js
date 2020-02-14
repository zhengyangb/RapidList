import React, {Component} from 'react';
import classes from './Auth.module.css';
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCircleNotch, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import * as actions from '../../store/action';
import Button from "../../components/UI/Button/Button";

class Auth extends Component {
    state = {
        token: null,
        isSignUp: false,
        error: null,
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        }
    };
    componentDidMount() {
        this.setState({
            error: this.props.error,
            token: this.props.token,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.error !== this.props.error){
            this.setState({error: this.props.error});
        }
        if (prevProps.token !== this.props.token){
            this.setState({token: this.props.token});
        }
    }

    inputChangedHandler = (event, inputKey) => {
        const updatedControls = {...this.state.controls};
        const updatedFormElement = {...updatedControls[inputKey]};
        updatedFormElement.value = event.target.value;
        updatedControls[inputKey] = updatedFormElement;
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };


    render() {
        const formElementArray = [];
        for (let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const loginSignupButton = (
            <React.Fragment>
                {this.props.loading? <FontAwesomeIcon icon={faCircleNotch} spin/>:(this.state.isSignUp? "Sign Up":"Log In")}
            </React.Fragment>
        );

        let errorMessage = null;
        const errorStyle = [classes.errorMessageBox];
        if (this.state.error){
            errorMessage = this.state.error.message.replace('_', ' ').toLowerCase();
            errorStyle.push(classes.displayBox);
        }

        const errorMessageBox = (<div className={errorStyle.join(' ')}>
            <FontAwesomeIcon icon={faBan}/> Error: {errorMessage}
        </div>);

        const form = formElementArray.map(formElement => (
            <Input put
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shoudValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)} //TODO
            />
        ));

        let content = null;

        if (this.state.token){
            content = (
                <div className={classes.FormDiv}>
                    <h3>{this.props.email}</h3>
                    <Button
                        clicked={this.props.logoutHandler}>Log out</Button>
                </div>
            );
        }
        else{
            content = (
                <div className={classes.FormDiv}>
                    {errorMessageBox}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button>{loginSignupButton}</Button>
                    </form>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType="light"
                    >{!this.state.isSignUp? "New user? Sign up" : "Already have an account? Log in"}</Button>
                </div>
            );
        }

        return (
            <div className="OuterBox">
                <h2><FontAwesomeIcon icon={faUserCircle}/> {this.state.token ? "Account" : (this.state.isSignUp? "Sign Up":"Log In")}</h2>
                <div className="Page">
                    {content}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        email: state.auth.email,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
        logoutHandler: () => dispatch(actions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);