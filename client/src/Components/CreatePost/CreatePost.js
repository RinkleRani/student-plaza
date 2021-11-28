import React from 'react';
import { API_ROOT } from '../../constants';
import PostData from '../PostDataList/PostData';
import './CreatePost.css';
class CreatePost extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId:"",
            title: "",
            price: "",
            category: "",
            description: "",
            condition: "",
            isLoading: false

        }
    }
    render() {
        return (
            <div>
                <p className="stylestate">Want to Sell?</p>
                <br />
                <br />
                <input className="post-data-input" onChange={this.handleInputChange} name="title" value={this.state.title} placeholder="Title"></input>
                <br />
                <br />
                <input className="post-data-input" onChange={this.handleInputChange} name="price" value={this.state.price} placeholder="Price" />

                <br />
                <br />
                <input className="post-data-input" onChange={this.handleInputChange} name="category" value={this.state.category} placeholder="Category" />

                <br />
                <br />

                <input className="post-data-input" onChange={this.handleInputChange} name="condition" value={this.state.condition} placeholder="Condition" />

                <br />
                <br />

                <input className="post-data-input" onChange={this.handleInputChange} name="description" value={this.state.description} placeholder="Description" />

                <br />
                <br />
                <br />
                <input type="button" disabled={this.state.isLoading} className="post-style-button" onClick={this.handleSubmit} value={this.state.isLoading ? "Submitting..." : "Create a Post"} />
                <input onClick={this.props.fn1} type="button" value="Cancel" />
            </div>
        );
    }
    handleInputChange = (e) => {
        const currentState = { ...this.state };
        currentState[e.target.name] = e.target.value;
        this.setState(currentState);
    }

    handleSubmit = async () => {
        this.setState({ isLoading: true });
        const trxobj = {
            userId : window.localStorage.getItem('userId'),
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            condition: this.state.condition,
        };
        try {
            const response = await fetch(API_ROOT + '/api/v0/post/',
                {
                    method: "POST",
                    headers: {'Authorization': window.localStorage.getItem('userID')},
                    body: JSON.stringify(trxobj)
                }
            );
            if(response.status === 201)
            {
                const data = await response.json();
                alert("post is stored successfully");
                this.setState({isLoading:false});
                this.props.fn1();
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
        //alert(JSON.stringify(this.state));
    }



}
export default CreatePost