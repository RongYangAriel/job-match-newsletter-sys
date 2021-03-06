import React, { useState, Component, propTypes} from "react";
import {Button, Input} from '@material-ui/core';


class EmailTemplate extends Component {
   
    constructor(props) {
        super(props);

        this.state =  {
            email: {
                body: this.props.body,
                from: this.props.from,
                to: null,
                subject: this.props.subject
            },
            templateReady: false
        }
       
    }

    handleClick = () => {
        this.props.toggle();
    }
    
    handleChange = (event) => {
        const newState = {...this.state.email, body: event.target.value};
        this.setState( {
            email: newState
        }, () => {
            console.log(this.state.email);
        });
    };

    fromChangeHandler = (event) => {
        const newState = {...this.state.email, from: event.target.value};
        this.setState( {
            email: newState
        }, () => {
            console.log(this.state.email);
        });
    };


    subjectChangeHandler = (event) => {
        const newState = {...this.state.email, subject: event.target.value};
        this.setState( {
            email: newState
        }, () => {
            console.log(this.state.email);
        });
    };



    handleSubmit = (event) => {

        this.setState({...this.state.email, templateReady: true});
        
    }

    render() {
        return (
          <div className="email">
            <div className="close" onClick={this.handleClick}>&times;    </div>
            <dl className="meta dl-horizontal">
                <dt>From
                    <input type="email" onChange={this.fromChangeHandler}></input>
                </dt>
                <dd>{this.props.from}</dd>

                <dt>To</dt>
                <dd>{this.props.to}</dd>

                <dt>Subject
                    <input type="text" onChange={this.subjectChangeHandler}></input>
                </dt>
                <dd>{this.props.subject}</dd>
            </dl>
            <form>
                <textarea type='text' className="body" value={this.state.email.body} onChange={this.handleChange}></textarea>
                <Button className='save-btn' color="primary" variant="contained" >
                    SAVE
                    <input  type="submit" value="Save"  hidden onClick={this.handleSubmit}/>
                </Button>
            </form>
            
          </div>
        );
    }

}


export default EmailTemplate;