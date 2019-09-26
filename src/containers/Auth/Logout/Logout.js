import React,{Component} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    
    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return(
            <div>
                Logged Out Successfully !
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: ()=> dispatch(actions.logout())
    };
};
export default connect(null,mapDispatchToProps)(Logout);