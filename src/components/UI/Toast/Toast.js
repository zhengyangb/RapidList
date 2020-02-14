import React from 'react';
import {connect} from "react-redux";
import classes from './Toast.module.css';

import {faTimes, faCloudDownloadAlt, faSyncAlt, faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Toast = (props) => {
    // useEffect(()=> {
    //     console.log('Toast, useEffect')
    // }, [])
    let content = null;
    if (props.error){
        content = (<React.Fragment>
            <FontAwesomeIcon icon={faTimes}/> Error
        </React.Fragment>)
    }
    else if (props.loading){
        content = (
            <React.Fragment>
                <FontAwesomeIcon icon={faCloudDownloadAlt}/> Loading data ...
            </React.Fragment>
        )
    }
    else if (props.uploading){
        content = (
            <React.Fragment>
                <FontAwesomeIcon icon={faSyncAlt}/> Syncing ...
            </React.Fragment>
        )
    }
    else {
        content = (
            <React.Fragment>
                <FontAwesomeIcon icon={faCheck}/> Up-to-date
            </React.Fragment>
        )
    }

    return (
        <div className={classes.Toast}>
            {content}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.status.loading,
        error: state.status.loadError,
        uploading: state.status.uploading,
    }
};

export default connect(mapStateToProps)(Toast);
