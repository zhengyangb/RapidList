import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


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
                <Toolbar toggled={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main style={{marginTop: '30px', padding: '20px'}}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;