import React, { useState, Component, propTypes} from "react";
import {Button, Input} from '@material-ui/core';

const Email = (props) => {
    return (
        <div className="email">
            <label>Candidate Index: </label>
            <input type="number"/>
            <div className="close" onClick={this.handleClick}>&times;    </div>

            <p>{props.email.body}</p>
        </div>
    )
}

export default Email;