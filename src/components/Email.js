import React, { useState, Component, propTypes} from "react";
import {Button, Input} from '@material-ui/core';


class Email extends Component {
   
    constructor(props) {
        super(props);

        this.state =  {
            email: {
                body: "This is Kirby who has connected with you on LinkedIn several days ago. I would like to share the open opportunities that could be a good match for you.  Meanwhile, I’d love to send the job openings that could be a good fit along with our insights to you every week. Hope the information could help you more with your career choice.",
                from: null,
                to: null,

            },
        }
       
    }

    handleClick = () => {
        this.props.toggle();
    }
    
    handleChange = (event) => {
        this.setState( {
            email: {
                body: event.target.value,
            }
        }, () => {
            console.log(this.state.email.body);
        });
    };

    handleSubmit = (event) => {

        console.log(this.state.email.body);
        
    }

    render() {
        return (
          <div className="email">
            <div className="close" onClick={this.handleClick}>&times;    </div>
            <dl className="meta dl-horizontal">
                <dt>From</dt>
                <dd>{this.props.from}</dd>

                <dt>To</dt>
                <dd>{this.props.to}</dd>

                <dt>Subject</dt>
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


export default Email;