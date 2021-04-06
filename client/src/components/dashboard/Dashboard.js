import React, { Component } from "react";
import Modal from "../login/LoginModal.js";
import "./Dashboard.css";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Chat from "../chat/Chat.js";
import Board from "../board/Board";
import Nav from "../nav/Nav";
import BoardList from "../boardlist/BoardList";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      image: "",
      author: "",
      lastModified: "",
      boardList: [],
      boardsAdded: false,
    }
  }
  
  getBoardData = () => {
    axios.post(`http://localhost:3001/api/board/getMyBoards`, {userId: this.props.getUsername()})
    .then(res => {
      console.log("getting user's boards")
      console.log(res.data)
      this.setState({boardList: res.data, boardsAdded: true});
      })
      .catch(err => {
        console.log(err.response)
      });
  }

  componentDidUpdate() {
    console.log("using effect")
    if(this.props.getTokenStatus() == true && this.state.boardsAdded == false){
      this.getBoardData()
      console.log("adding board stuff");
    }
  }

  createBoard = () => {
    axios.post(`http://localhost:3001/api/board/createBoard`, {userId: this.props.getUsername()})
      .then(res => {
        console.log("creating a new board for user: " + this.props.getUsername())
        })
        .catch(err => {
          console.log(err.response)
        });
    }
  

  getImage = () => {
  
    axios.get(`http://localhost:3001/api/board/image`)
      .then(res => {
        console.log("Grabbing board image for: ");
      })
      .catch(err => {
        console.log(err.response)
      });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  showLoginAndRegister = () => {
    console.log("token: " + this.props.getTokenStatus());    
  } 

  logout = () => {
    this.props.deleteToken();
  }

  render() {
    return (
      <div>        
        <Nav setUsername={this.props.setUsername} getUsername={this.props.getUsername} 
             setToken={this.props.setToken} getToken={this.props.getToken} getTokenStatus={this.props.getTokenStatus}
             deleteToken={this.props.deleteToken} setUserId={this.setUserId} setBoardData={this.setBoardData}/>
        <BoardList getImage={this.getImage} getAuthor={this.getAuthor} getLastModified={this.getModified} getBoardData={this.getBoardData}/>
          <button
            className="createBoard"
            type="button"
            onClick={() => this.createBoard()}
          >
          create board
          </button>
      </div>
    );
  }
}

//         <Chat getUsername={this.props.getUsername} />

