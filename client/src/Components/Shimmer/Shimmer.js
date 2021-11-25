import React from "react";
import "./Shimmer.css";
class Shimmer extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="card br">
                <div class="wrapper">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div class="profilePic animate" style={{marginRight: "2rem"}}></div>
                        <div style={{color: "gray"}}>
                            {this.props.loadingText}
                        </div>
                    </div>
                    <div class="comment br animate w80"></div>
                    <div class="comment br animate"></div>
                    <div class="comment br animate"></div>
                </div>
            </div>
        );
    }


}
export default Shimmer;