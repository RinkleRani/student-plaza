import React from "react";
import { FaAngellist, FaDollarSign, FaTags } from "react-icons/fa";
import { API_ROOT } from "../../constants";
import { ALL_POSTS } from "../../mockdata/AllPosts";
import Shimmer from "../Shimmer/Shimmer";
import "./PostData.css"

class PostData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataFetching: true,
            data: []
        }
    }

    async componentDidMount() {
        await this.fetchData(this.props.searchKey);
    }

    fetchData = async (searchKey) => {
        this.setState({ isDataFetching: true, data: [] });

        try {
            const fetchResult = await fetch(
                "https://search-es-post-qypyn2r3s3iwgpz27h4ii7rlly.us-west-2.es.amazonaws.com/_search/?pretty=true&q=" + searchKey,
                {
                    method: "GET",
                    headers: {}
                }
            );
            if (fetchResult.status === 200) {
                const data = await fetchResult.json();
                console.log("search key is" , searchKey);
                console.log("loading is done ", data);
                this.setState({ isDataFetching: false, data: data });
            }
            else { throw ("api returned error") }
        }
        catch (er) {
            alert("failed to load posts ");
            this.setState({ isDataFetching: false });
        }
    }
    render() {
        return (
            <div style={{ marginLeft: "3rem", marginTop: "2rem" }}>
                {
                    this.state.isDataFetching ?
                        <Shimmer loadingText="Loading posts, please be patient..." />
                        :
                        this.renderData()
                }
            </div>
        )
    }
    renderData = () => {
        return (
            <div>
                {
                    this.state.data.hits.hits.map(this.renderPost)
                }
            </div>
        )
    }
    renderPost = (post, index) => {
        return (
            <div className="card br" key={"post_" + index}>
                <div>
                    <h2>{post._source.title.S}</h2>
                </div>
                <div style={{ marginBottom: "24px" }}>
                    {post._source.description.S}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="withIcon">
                        <FaAngellist />
                        <div className="tag">
                            {post.condition}
                        </div>
                    </div>
                    <div className="withIcon">
                        <FaDollarSign />
                        <div className="tag">
                            {post._source.price.S}
                        </div>
                    </div>
                    <div className="withIcon">
                        <FaTags />
                        <div className="tag">
                            {post.category}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostData;
