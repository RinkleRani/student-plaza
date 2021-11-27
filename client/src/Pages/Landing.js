import React from 'react';
import Popup from 'reactjs-popup';
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './../App.css';
import './Landing.css';
import SignUp from './SignUp.js';
import { API_ROOT } from '../constants';
class Landing extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId:"",
            user: "",
            password: "",
            showSignUpPost: false,
            isLoading: false
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
                                <input className="style-button" type="submit" disabled={this.state.isLoading} onClick={this.handleSubmit} value={this.state.isLoading ? "Submitting...": "Sign-In"} />
                            </div>
                            <br/>

                            <p>{this.state.loginStatus}</p>

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

    handleSubmit = async () => {
        this.setState({ isLoading: true });
        /*const trxobj = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            condition: this.state.condition,
        };*/
        try {
           /* const response = await fetch(API_ROOT + '/api/auth',
                {
                    method: "POST",
                    headers: {},
                    body: JSON.stringify(trxobj)
                }
            );*/
            if(true)//response.status == 200)
            {
               // const data = await response.json();
                alert("post is stored successfully");
                this.setState({isLoading:false});
            }
            else
            {
                throw("api call failed");
            }
        }
        catch (error) {
            alert("failed api call");
            this.setState({isLoading:false});

        }
        //const navigate = useNavigate();
        //alert(JSON.stringify(this.state));
        //navigate('/home');
        //this.state.user
        //this.state.password

        //Need to remove the below navigation once DB set up is complete
      // way to share data to creatpost API call in Home component.
        //window.localStorage.setItem('userID','111');
       // window.location.href='/home';

        Axios.post("http://localhost:3001/login",{emailInp:this.state.user,passwordInp:this.state.password
    }).then((response)=>{
        if(response.data.message){
            console.log(response.data);
            this.setState({loginStatus:response.data.message })
            //this.state.loginStatus = response.data.message;
        }
        else{
            console.log(response.data);
            this.setState({loginStatus: response.data[0].name});
            window.location.href='/home';
        }
    });

      
    }
}
export default Landing