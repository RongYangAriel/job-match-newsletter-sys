import React, { useState, Component} from "react";

import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import {Button, Input} from '@material-ui/core';
import Email from './Email';
import '../assets/email.css';

class ExcelImporter extends Component  {
    constructor(props){
    super(props);

    this.state = {
        talent:{
            cols: null,
            rows: null,
            dataLoaded: false
        },
        jd: {
            cols: null,
            rows: null,
            dataLoaded: false
        },
        matchedJobs: {
            cols: {
                talentName: "",
                email:"",
                location: "",
                seniority: "",
                techstack: "",
                IOM: "",
                jobLinks: [],
                linkedIn: ""
            },
            rows: null
        },
        emailTemplate: {
            subject: null,
            body: "This is Kirby who has connected with you on LinkedIn several days ago. I would like to share the open opportunities that could be a good match for you.  Meanwhile, I’d love to send the job openings that could be a good fit along with our insights to you every week. Hope the information could help you more with your career choice.",
            matchedPosition: null,
            close: "Thanks, Kirby"
        },
        emailPoped: false

    };

    this.talentHandler = this.talentHandler.bind(this);
    this.jdHandler = this.jdHandler.bind(this);
    }

    talentHandler = (event) => {
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

    jdHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, res) => {
            if (err) {
                console.log('error', err)
            } else {
                this.setState({
                    jd: {
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

    loadData = () => {

    }

    emailPop = (event) => {
        this.setState({
            emailPoped:! (this.state.emailPoped)
        }, () => {
            console.log(this.state);
        });
    }

    render () 
        {
        return (
        <div className='container'>
            <div className="links">

                <Button variant="contained" color="primary" component="label">
                    Talent Import
                    <input type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange = {this.talentHandler} hidden></input>
                </Button>

                <Button variant="contained" color="primary" component="label">
                    JD Imports
                    <input type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange = {this.jdHandler} hidden></input>
                </Button>
                {/* {this.state.talent.dataLoaded ? 
                    <OutTable data={this.state.talent.rows} columns={this.state.talent.cols}/> : <p>error</p>} */}
                
                <Button variant="contained" color="primary" component="label" onClick={this.emailPop}>
                    Email Template
                </Button>
            </div>
            
            
            <div className='links'>
                <Button variant="contained" color="default" component="label" onClick={this.loadData}>
                    Load Data
                </Button>
            </div>

            {
                this.state.emailPoped ? 
                (<div className ='email-container show'> 
                    <Email toggle={this.emailPop} /> 
                </div>)
                : (<div className ='email-container hidden'> 
                <Email toggle={this.emailPop} /> 
            </div>)
            }

        </div>
          

    )
    }
    
};

export default ExcelImporter;