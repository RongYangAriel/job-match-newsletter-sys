import React, { useState, Component} from "react";

import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import {Button, Input} from '@material-ui/core';

class ExcelImporter extends Component  {
    constructor(props){
    super(props);

    this.state = {
        talent:{
            cols: null,
            tows: null,
            dataLoaded: false
        },
        jd: {
            jdColes: null,
            jdRows: null,
            jdLoaded: false
        }

    };

    this.fileHandler = this.fileHandler.bind(this);
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, res) => {
            if (err) {
                console.log('error', err)
            } else {
                this.setState({
                    talent: {
                        cols:res.cols,
                        rows:res.rows,
                        dataLoaded:true,
                    }
                }, () => {
                    console.log(this.state);
                });
            }
        })
    }
    render () 
        {
        return (
        <React.Fragment>
            <Button variant="contained" color="primary" component="label">
            Talent Import
            <input type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange = {this.fileHandler} hidden></input>
            </Button>

            <Button variant="contained" color="primary" component="label">
            JD Imports
            <input type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange = {this.fileHandler} hidden></input>
            </Button>
            {/* {this.state.talent.dataLoaded ? 
                <OutTable data={this.state.talent.rows} columns={this.state.talent.cols}/> : <p>error</p>} */}
        </React.Fragment>

    )
    }
    
};

export default ExcelImporter;