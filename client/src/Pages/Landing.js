import React from 'react';
import Popup from 'reactjs-popup';
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './../App.css';
import './Landing.css';
import SignUp from './SignUp.js';
import Axios from "axios";

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
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div className="style-fieldset">
                                <div className="style-name">
                                    STUDENT - PLAZA
                                </div>

                                <div className="style-input"><Link to="Home">Home</Link></div>
                            </div>
                        </div>

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
                            <br />
                            <br />
                            <br></br>
                            <div>
                                <button className="style-button" type="submit" onClick={this.handleSubmit}>Sign-In</button>
                            </div>
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
        Axios.post("http://localhost:3001/register",{userNameInp:this.state.user,passwordInp:this.state.password
    }).then(()=>{
        alert("successful insert");
    });
        window.location.href='/home';
    }
}
export default Landing