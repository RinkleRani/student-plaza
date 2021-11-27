import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';
import HVInput from '../Components/HVInput/HVInput'
import CreatePost from '../Components/CreatePost/CreatePost';
import PostData from '../Components/PostDataList/PostData';

class Home extends React.PureComponent {
    postData = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            searchkeyInInput:"",
            showCreatePost: false,
        }


    }
    showALert =() => {
        alert("alert is shown");
    }
    renderDialogs = () => {
        console.log("redner dialog called", this.state);
        return (
            <div>
                {
                    this.state.showCreatePost
                        ?
                        <div className="modal">
                            <div className="modal-content">
                                <CreatePost fn1={this.hideCreatePost}/>
                                
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
            <div>
                <div>
                    <br />
                    <div className="stylelogout" style={{ display: "flex", flexDirection: "row-reverse", paddingRight: "16px" }}>
                        <FaUser style={{ marginLeft: "8px" }} />
                        <Link to="/"> Logout</Link>

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                        <div style={{ paddingLeft: "3rem" }} className="searchInputHolder">
                            <HVInput icon={<FaSearch />} name="searchkeyInInput" value={this.state.searchkeyInInput} onChange={this.handleInputChange} placeholder="Type your search query" />
                        </div>
                        <div >
                            <input type="button" className="stylesearchbutton" onClick={this.handleSubmit} value="View Posts" />
                        </div>
                    </div>

                    <div>
                        <PostData ref={this.postData} searchKey={this.state.searchkeyInInput} />
                    </div>


                    <div onClick={this.showCreatePost} style={{ position: "absolute", bottom: "15px", right: "15px", zIndex: "100", backgroundColor: "blue", width: "50px", height: "50px", borderRadius: "50px", fontSize: "3rem", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        +
                    </div>
                    <div>
                        {this.renderDialogs()}
                    </div>

                </div>
            </div>
        )
    }
    showCreatePost = () => {
        this.setState({ showCreatePost: true });
    }
    hideCreatePost = () => {
        this.setState({ showCreatePost: false });
        if (this.postData.current) {
            this.postData.current.fetchData();
        }
    }
    handleInputChange = (e) => {
        const currentState = { ...this.state };
        currentState[e.target.name] = e.target.value;
        this.setState(currentState);
    }
    handleSubmit = () => {
        if (this.postData.current) {
            this.postData.current.fetchData();
        }
        //const navigate = useNavigate();
       // alert(JSON.stringify(this.state));
        //navigate('/home');
    }
}

export default Home