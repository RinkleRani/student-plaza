import React, {useState, useEffect} from 'react';

import './Login.css';

class Login extends React.PureComponent {
   
    constructor(props) {
        super(props);

        this.state={
            user: "",
            password: "",

        }

    }

    

    render() {
        return (
                <div className="form-box">                   
                        <label>
                            <p>Email</p>
                            <input name="user" className="data-input" onChange={this.handleInputChange} value={this.state.user} placeholder="Enter your email"/>
                        </label>
                    
                    <br></br>
                    
                    
                        <label>
                            <p>Password</p>
                            <input name="password" className="data-input" onChange={this.handleInputChange} value={this.state.password} placeholder="Enter your password"/>
                        </label>

                        
                 
                    <br />
                    <br />
                    <br />
                    <br></br>
                        <div>
                        <input type="button" className="style-button" onClick={this.handleSubmit} value="Sign-In"/>
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
     
   
    //const navigate = useNavigate();
    alert("hello world");
    //navigate('/home');
}

    
}




export default Login