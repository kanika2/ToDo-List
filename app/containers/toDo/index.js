import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import "./toDo.css";

import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from "../../utils/injectSaga";
import reducer from './reducer';
import saga from "./saga"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import { checkStatus } from "./action";
import { makeSelectToDo } from "./selectors";
import { connect } from "react-redux";

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
            statusValue : false,
        }
        // let statusValue = false;
        // this.props.statusCheck(statusValue);
        // console.log(statusValue);
    }

    componentDidMount () {
        console.log("===============prop============", this.props);
        this.props.statusCheck(this.state.statusValue);
        console.log(this.state.statusValue);
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
        // console.log(list);
    }

    GetValue = (e)=> {
        this.setState({value: e.target.value});
    }

    AddTask = () => {
        // console.log(this.state.value);
        let value = this.state.value;
        let listObject = [];
        value === "" ? {}: this.state.list.push(value);
        // console.log(this.state.list);
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

    clickHandle = (key) => {
        // console.log(key.target.value);
        let keyCheck = key.target.value
        // console.log(key.target);
        this.state.list.map((messages, key) => {
            // console.log(typeof(keyCheck), typeof(key));
            // console.log(messages[key]);
            keyCheck == key ?  this.state.check ? this.setState({check: false}): this.setState({check: true}) :{}
        });
    }

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
        console.log("render", this.props.toDo);
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
                                                    />
                                                </div>
                                                <div className="message">
                                                    <p style={this.state.check[index]?{textDecoration:"line-through"}:{textDecoration: "none"}}>{messages}</p>
                                                </div>
                                                <div className="deleteButton">
                                                    <IconButton aria-label="Delete" onClick={() => {this.deleteHandle(index)}}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <p>API Data</p>
                                    {
                                        this.props.toDo.map((v,key)=>{
                                            return <p key={key}>{v.title}</p>
                                        })
                                    }
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
                </div>
            </div> 
        );
    }
}

toDo.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(toDo);

export function mapDispatchToProps(dispatch) {
    console.log("dispatch", dispatch);
    return {
        statusCheck : (statusValue) => {dispatch(checkStatus(statusValue))},
    };
}
  
const mapStateToProps = createStructuredSelector({
    toDo : makeSelectToDo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'todo', reducer });
const withSaga = injectSaga({ key: "todo", saga });
  
export default compose(
  withReducer,
  withSaga,
  withConnect,
)( withStyles(styles)(toDo));

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(withStyles(styles)(toDo)); //this works
// export default withStyles(styles)(toDo);  //this works