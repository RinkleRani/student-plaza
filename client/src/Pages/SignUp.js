import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaUser} from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import './SignUp.css';
//import Axios from "axios";


class SignUp extends React.PureComponent {
   //navigate = useNavigate();
    constructor(props) {
        super(props);
        this.state={
            email : "",
            fullName: "",
            phone: "",
            pass: "",
            cpass: "",
        }

    }
    render() {
    return (
    <div>
        <div style={{height:"60%"}}>
                   <p className="signid"> Full Name </p>
                   <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container" >
                          <FaUser className="icon-style" />
                        <input className="data-input" onChange={this.handleInputChange} name="fullName" value={this.state.fullName} ></input>
                    </div>
                    <br/>

                    <p className="signid"> Phone </p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                   <FaPhoneAlt className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="phone" value={this.state.phone} ></input>
                    </div>
                    <br/>

                    <p className="signid">Email </p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                    <FaEnvelope className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="email" value={this.state.email} />
                   </div>
                    <br/>
                  
                    <p className="signid">Password </p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                    <FaKey className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="pass" value={this.state.pass}  type="password"/>
                   </div>
                    <br/>
                    
                   <p className="signid"> Confirm Password  </p>
                   <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                   <FaKey className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="cpass" value={this.state.cpass} type="password"/>
                   </div>
                    <br />
                    <input type="button" className="style-button" onClick={this.handleSubmit} value="Submit"/>

                </div>
    </div>
  ) 

    }

    handleInputChange = (e) => {
        const currentState = {...this.state};
        currentState[e.target.name] = e.target.value;
        this.setState(currentState);
    }

    handleSubmit = (e) => {
        if(!this.state.email.includes('@scu.edu')){
            alert(JSON.stringify("Sorry! This website is only open for SCU Students."));
            this.setState({
                  email: "",
                  fullName: "",
                  phone: "",
                  pass: "",
                  cpass: "",
              });
        }
        
       else{ 
        alert(JSON.stringify(this.state));
        Axios.post("http://localhost:3001/register",{emailInp:this.state.email,passwordInp:this.state.cpass,fullNameInp:this.state.fullName,contactInp:this.state.phone
        }).then(()=>{
        alert("successful insert");
        });
        window.location.href='/';

         //const navigate = useNavigate();
        //navigate('/home');
    }

    }
}
export default SignUp