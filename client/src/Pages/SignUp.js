import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaUser} from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import './SignUp.css';
import Axios from "axios";
import { API_ROOT } from '../constants';


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
                   <p className="signid"> Full Name * </p>
                   <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container" >
                          <FaUser className="icon-style" />
                        <input className="data-input" onChange={this.handleInputChange} name="fullName" value={this.state.fullName} required></input>
                    </div>
                    <br/>

                    <p className="signid"> Phone </p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                   <FaPhoneAlt className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="phone" value={this.state.phone} required></input>
                    </div>
                    <br/>

                    <p className="signid">Email *</p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                    <FaEnvelope className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="email" value={this.state.email} required />
                   </div>
                    <br/>
                  
                    <p className="signid">Password *</p>
                    <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                    <FaKey className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="pass" value={this.state.pass}  type="password" required/>
                   </div>
                    <br/>
                    
                   <p className="signid"> Confirm Password  *</p>
                   <div style={{display: "flex", alignItems: "center", height:"3em"}} className="container">
                   <FaKey className="icon-style" />
                    <input className="data-input" onChange={this.handleInputChange} name="cpass" value={this.state.cpass} type="password" required/>
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


    handleSubmit = async () => {
        if(this.state.pass !== this.state.cpass ||!this.state.email.includes('@scu.edu') || (this.state.email==""||this.state.pass==""||this.state.fullName==""||this.state.cpass=="")){
            if(this.state.pass !== this.state.cpass)
            {alert(JSON.stringify("Please make sure the fields password and confirm password match"));
            this.setState({
                pass:"",
                cpass:""
            });}
            else if(!this.state.email.includes('@scu.edu')){
                alert(JSON.stringify("Sorry! This website is only open for SCU Students."));
            this.setState({
                  email: ""
              });
            }
            else{
                alert(JSON.stringify("Required fields cannot be empty!"));
            }
        }
        
       else{ 
        //alert(JSON.stringify(this.state));
        console.log("In else");
        

        // Axios.post(API_ROOT+"/register",{emailInp:this.state.email,passwordInp:this.state.cpass,fullNameInp:this.state.fullName,contactInp:this.state.phone
        // }).then((response)=>{
        // console.log("Registered")
        // console.log(response.data);
        // alert("successful insert");
        // alert(JSON.stringify("Registered"));
        // });


        const trxobj = {
            emailInp:this.state.email,
            passwordInp:this.state.cpass,
            fullNameInp:this.state.fullName,
            contactInp:this.state.phone
        };
        try {
            console.log("try of create post");
            const response = await fetch(API_ROOT+"/register",
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(trxobj)
                }
            );
            //const status1= JSON.stringify(response);
            console.log("response" + response.status);
            if(response.status === 201)
            {
                console.log("Registered");
              //  const data = await response.json();
                alert("Created account");
               // this.setState({isLoading:false});
               // this.props.fn1();
            }
            else
            {
                throw("api call failed");
            }
        }
        catch (error) {
            console.log("error" + error);
            alert("failed api call");
            this.setState({isLoading:false});

        }






        window.location.href='/';

         //const navigate = useNavigate();
        //navigate('/home');
    }

    }
}
export default SignUp