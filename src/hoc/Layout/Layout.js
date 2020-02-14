import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toast from "../../components/UI/Toast/Toast";


class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    render(){
        return (
            <div>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    email={this.props.email}
                    toggled={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main style={{marginTop: '30px', padding: '20px'}}>
                    {this.props.children}
                </main>
                <Toast/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        email: state.auth.email,
    }
};

export default connect(mapStateToProps)(Layout);