import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./selection.css";

export default class selectionPage extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>
                <div className="Wrapper">
                    <Link to="/toDo">
                        <div className="ButtonWrapper">
                            <button
                                className="Button"
                                // onClick = {()=>{this.setState({toDoStatus: true})}}
                            >ToDo</button>
                        </div>
                    </Link>
                    <Link to="/toDo">
                        <div className="ButtonWrapper">
                            <button
                                className="Button"
                                // onClick = {()=>{this.setState({apiStatus: true})}}
                            >Make Api Call</button>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}