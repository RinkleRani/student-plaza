import React from 'react';
import './HVInput.css';
import axios from 'axios';
class HVInput extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.cancel='';

    }
    render() {
        return (
            <div style={{display: "flex", alignItems: "center"}} className="stylesearch">
                <div style={{marginRight: "8px", marginLeft: "8px"}}>
                    {this.props.icon}
                </div>
                <input className="myinput" style={{height: "4rem", fontSize: "large", border: "0px", backgroundColor: "inherit", width: "100%"}} onChange={this.props.onChange} placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.onChange}></input>
            </div>
        );
    }
   
}
export default HVInput