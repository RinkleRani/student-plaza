import React from 'react';
import Popup from 'reactjs-popup';
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './../App.css';
import './Landing.css';
import SignUp from './SignUp.js';
import Axios from 'axios';
import title from './images/studentplaza.png'

class Landing extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            showSignUpPost: false

        };
    }
    renderDialogs = () => {
        console.log("redner dialog called", this.state);
        return (
            <div>
                {
                    this.state.showSignUpPost
                        ?
                        <div className="modal">
                            <div className="modal-content">
                                <SignUp/>
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        );

    }

    render() {
        return (
            <>
                <div className="homepage-bgimage">
                    <div style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "8px" }}>
                      <img src={title}/>
                    </div>
                    <div className="form-box">

                            <label>
                                <p className="tag">Email</p>
                                <FaEnvelope className="iconstyle" />
                                <input type="text" id="styletext" name="user" className="styleemail" value={this.state.user} onChange={this.handleInputChange} placeholder="Enter Email" />
                            </label>

                            <br></br>
                            <label>
                                <p className="tag">Password</p>
                                <FaKey className="iconstyle" />
                                <input type="password" id="styletext" name="password" className="datainput" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter password" />
                            </label>
                            <br />
                            <p className="loginstatus">{this.state.loginStatus}</p>
                            <br></br>
                            <div>
                                <button className="style-button" type="submit" onClick={this.handleSubmit}>Sign-In</button>
                            </div>
                            <br/>

                            

                            <br />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className="styleques">Don't have an Account? </div>
                                <button className="style-signup" type="submit" onClick={this.showSignUpPost}>SignUp</button>
                            </div>

                    </div>
                    <div>
                        {this.renderDialogs()}
                    </div>

                </div>
            </>

        )
    }

    showSignUpPost = () => {
        this.setState({ showSignUpPost: true });
    }
    hideSignUpPost = () => {
        this.setState({ showSignUpPost: false });
    }

    handleInputChange = (e) => {
        const currentState = { ...this.state };
        currentState[e.target.name] = e.target.value;
        this.setState(currentState);
    }

    handleSubmit = (e) => {
        //const navigate = useNavigate();
        //alert(JSON.stringify(this.state));
        //navigate('/home');
        //this.state.user
        //this.state.password

        //Need to remove the below navigation once DB set up is complete
      // way to share data to creatpost API call in Home component.
        //window.localStorage.setItem('userID','111');
       //window.location.href='/home';

        Axios.post("http://a64f2e3e4a3fe47d49b0877d457098bf-922598223.us-west-2.elb.amazonaws.com:8080/login",{emailInp:this.state.user,passwordInp:this.state.password
    }).then((response)=>{
        if(response.data.message){
            console.log(response.data);
            this.setState({loginStatus:response.data.message })
        }
        else{
            console.log(response.data);
            this.setState({loginStatus: "Login Success!"});
            window.localStorage.setItem('userID',response.data[0].id);
           // alert(JSON.stringify("Welcome "+this.state.loginStatus));
          // Axios.get("http://localhost:3001/userlogin",{emailInp:this.state.user,passwordInp:this.state.password}).then((response)=>{console.log(response)});
            window.location.href='/home';
        }
    });


    }
}
export default Landing
