import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import "./toDo.css"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";

const styles = theme => ({
    input : {
        fontSize: "20px",
        // fontFamily: '"Playfair Display", serif',
        fontWeight: "200px",
        letterSpacing: "3px",
        margin: "10px 0px",
        padding: "5px 5px",
        minHeight: "27px"
    }
});

class toDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check : [],
            value : "",
            list : [],
        }
    }

    componentDidMount () {
        let listLength = 0;
        let check = [];
        // console.log("componentDidMount")
        let list = localStorage.getItem('list');
        list && list != "null" ? list = JSON.parse(list) : list = [];
        listLength = list.length;
        for(let i=0; i<listLength; i++) {
            check.push(false);
        }
        this.setState({list, check});
        console.log(list);
    }

    GetValue = (e)=> {
        this.setState({value: e.target.value});
    }

    AddTask = () => {
        // console.log(this.state.value);
        let value = this.state.value;
        let listObject = [];
        value === "" ? {}: this.state.list.push(value);
        console.log(this.state.list);
        // this.state.list.map ((value, key) => {
        //     return (listObject.push ({
        //         id : key,
        //         message : value
        //     }));
        // })
        // console.log(listObject);
        let listValue = this.state.list;
        // let listValue = listObject;
        // console.log(listValue);
        listValue = JSON.stringify(listValue);
        localStorage.setItem('list',listValue);
        console.log("done");
        this.setState({value : ""});
    }

    // clickHandle = (key) => {
    //     // console.log(key.target.value);
    //     let keyCheck = key.target.value
    //     console.log(key.target);
    //     this.state.list.map((messages, key) => {
    //         // console.log(typeof(keyCheck), typeof(key));
    //         // console.log(messages[key]);
    //         keyCheck == key ?  this.state.check ? this.setState({check: false}): this.setState({check: true}) :{}
    //     });
    // }

    clickHandle = (index) => {
        let check = this.state.check;
        check[index] = !check[index];
        this.setState({check});
    }

    deleteHandle = (index) => {
        let list = this.state.list;
        let check = this.state.check;
        list.splice(index,1);
        check.splice(index,1);
        this.setState({list, check});
        list = JSON.stringify(list);
        localStorage.setItem("list", list);
    }

    render() {
        const { classes } = this.props;
        // console.log(this.props);
        return(
            <div>
                <div className="toDoWrapper">
                    <Grid  className="pageContainer" container spacing={16} direction="row" >
                        <Grid item xs={12} sm={2} md={2} lg={2} ></Grid>
                        <Grid  className="toDo" item xs={12} sm={8} md={8} lg={8}>
                            <Grid className="toDoContainer" container direction="column">
                                <Grid item className="inputFieldWrapper">
                                    <div className="inputField">
                                        <TextField
                                            id="outlined-textarea"
                                            label="To Do"
                                            placeholder="To Do Assignment..."
                                            multiline
                                            className="inputFieldCss"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth = {true}
                                            value={this.state.value}
                                            onChange={this.GetValue}
                                            InputProps = {{
                                                className: classes.input
                                            }}
                                        />
                                    </div>
                                    <div className="addButton">
                                        <Button variant="fab" color="primary" aria-label="Add" onClick={this.AddTask}>
                                            <AddIcon />
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item className="toDoList">
                                    {this.state.list.map ((messages, index) => {
                                        return (
                                            <div className="listWrapper" key={index}>
                                                <div className="checkBox" >
                                                    <Checkbox
                                                        checked={this.state.check[index]}
                                                        onClick={()=> {this.clickHandle(index)}}
                                                        iconStyle={{fill: 'white'}}
                                                    />
                                                </div>
                                                <div className="message">
                                                    <p style={this.state.check[index]?{textDecoration:"line-through"}:{textDecoration: "none"}}>{messages}</p>
                                                </div>
                                                {/* <div className="editButton">
                                                    <Button variant="fab" color="secondary" aria-label="Edit" >
                                                        <Icon>edit_icon</Icon>
                                                    </Button>
                                                </div> */}
                                                <div className="deleteButton">
                                                    <IconButton aria-label="Delete" onClick={() => {this.deleteHandle(index)}}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="clearAllButtonWrapper">
                                        <button
                                            className="clearAllButton"
                                            onClick = {()=>{localStorage.setItem("list", "null"); this.setState({list: [], clear: []})}}
                                        >Clear All</button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                    </Grid>
                    {/* <div style={{flexGrow:"1", backgroundColor: "green"}}></div>
                    <div className="toDo">
                        <div className="inputFieldWrapper">
                            <div className="inputField">
                                <TextField
                                    id="outlined-textarea"
                                    label="To Do"
                                    placeholder="To Do Assignment..."
                                    multiline
                                    // className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth = {true}
                                />
                            </div>
                            <div className="addButton">
                                <Button variant="fab" color="primary" aria-label="Add" >
                                    <AddIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div style={{flexGrow:"1", backgroundColor: "green"}}></div> */}
                </div>
            </div> 
        );
    }
}

toDo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(toDo);
