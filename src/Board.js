import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done'
import Add from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { lightBlue50 } from 'material-ui/styles/colors';
import title from '../img/title.png';
import title2 from '../img/title2.png';
import Login from './Login';
import './App.css';
import Post from './Post';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      postList: [],
      user: '',
      login: false,
      money: '',
      type: 'borrow',
      peopleCnt: 0,
      newPost: { id: '', user: '', time: '' },
      index: 0,
      chipData: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleSubmitMoney = this.handleSubmitMoney.bind(this);
    this.handleAddMoney = this.handleAddMoney.bind(this);
    this.handleDelMoney = this.handleDelMoney.bind(this);
    this.handleSetType = this.handleSetType.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);
    this.handleCountTotal = this.handleCountTotal.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  style = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  handleLogin(userName) {
    if (userName !== '') {
      this.setState({ user: userName });
      this.setState({ login: true });
    }
  }
  handleUserChange(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    } else {
      this.setState({
        newPost: {
          id: this.state.index,
          user: e.target.value,
        },
      });
    }
  }
  handleContentChange(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    } else {
      this.setState({
        money: e.target.value,
      });
    }
  }
  handleSubmit() {
    this.handleAddPost();
  }

  handleAddPost() {
    if (this.state.newPost.user !== '') {
      const list = this.state.postList;
      list.push({
        id: this.state.newPost.id,
        user: this.state.newPost.user,
        time: Date(),
        accounting: [],
        press: 0,
        lend: 0,
        borrow: 0,
        total: 0,
      });
      this.setState({ postList: list });
      this.setState({ index: this.state.index + 1 });
    }
    this.setState({
      newPost: {
        id: '',
        user: '',
        time: '',
     },
    });
  }

  handleSubmitMoney() {
    if (this.state.money !== '' && this.state.chipData.length !== 0) {
      for (let i = 0; i < this.state.postList.length; i += 1) {
        if (this.state.postList[i].press === 1) {
          const list = this.state.postList[i];
          const money = Math.round(this.state.money / this.state.peopleCnt);
          list.accounting.push({
            id: list.accounting.length,
            type: this.state.type,
            content: money,
            time: Date(),
          });
          this.handleCountTotal(i, money, this.state.type);
          list.press = 0;
          this.setState({ list });
        }
      }
    } else if (this.state.money === '') {
      alert("please input the money before pressing done!")
    } else if (this.state.chipData.length === 0) {
      alert("please click the button of the user name before pressing done. If you can't find the button, please add user name first")
    }
    
    this.setState({
      money: '',
      peopleCnt: 0,
      chipData: [],
    });
    console.log(this.state.type);
  }
  handleAddMoney(index) {
    if (this.state.postList[index].press === 0) {
      let list = this.state.postList[index];
      let chip = this.state.chipData;
      list.press = 1;
      chip.push({
        key: index,
        label: list.user,
      });
      console.log("push");
      console.log(index);
      this.setState({ list });
      this.setState({ chip });
      this.setState({ peopleCnt: this.state.peopleCnt + 1 });
    }
  }
  handleDelMoney(index) {
    console.log("del");
    let list = this.state.postList[index];
    list.press = 0;
    this.setState({ list });
    for (let i = 0; i < this.state.chipData.length; i += 1) {
      if (this.state.chipData[i].key == index) {
        console.log("delete");
        console.log(index);
        this.handleDeleteChip(index);
      }
    }
    this.setState({ chipData: this.state.chipData });
    
  }
  handleDeleteChip = (key) => {
    for (let i = 0; i < this.state.postList.length; i++) {
      const list = this.state.postList[i];
      if (list.id == key) {
        list.press = 0;
      }
      this.setState({ list });
    } 
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({ chipData: this.chipData });
    this.setState({
      peopleCnt: this.state.peopleCnt - 1,
    });
  }
  handleSetType(id) {
    let t;
    if (id === 0) {
      t = 'borrow';
    } else {
      t = 'lend';
    }
    this.setState({
      type: t,
    });
  }
  handleCountTotal(index, money, type) {
    let list = this.state.postList[index];
    if (type === "lend") {
      list.lend = list.lend + money;
      list.total = list.total + money;
    } else if (type === "borrow") {
      list.borrow = list.borrow + money;
      list.total = list.total - money;
    }
    this.setState({ list });    
  }
  handleDeleteItem(listId, itemId) {
    console.log("delete item");
    console.log(itemId);
    const list = this.state.postList[listId];
    const item = list.accounting[itemId];
    const money = list.accounting[itemId].content;
    list.accounting.splice(item, 1);
    if (item.type === "lend") {
      list.lend = list.lend + money;
      list.total = list.total - money;
    } else if (item.type === "borrow") {
      list.borrow = list.borrow + money;
      list.total = list.total + money;
    }
    this.setState({ list });
  }
  renderChip(data) {
    let str1 = "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/";
    let str2 = "/android/sticker.png;compress=true"
    let id = 13132741 + data.key;
    let str = str1.concat(id).concat(str2);
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleDeleteChip(data.key)}
        style={this.style.chip}
      >
        <Avatar src={str} />
        {data.label}
      </Chip>
    );
  }
  render() {
    return (
      <div className="Board">
        {this.state.login !== true &&
          <div className="login">
            <img src={title} className="loginTitle" width="40%" />
            <Login
              handleLogin={this.handleLogin}
            />
          </div>
        }
        {this.state.login === true &&
          <div>
            <div className="boardHeader">
              <img src={title2} className="loginTitle" width="40%" />
            </div>
            <div className="AppBar">
              <h3>Welcome,   {this.state.user}</h3>
              <div className="input">
                <p className="intro">Hi, this is an accounting manager webpage. You can manage your lending and borrowing by first create your group member by entering the user name below.
Then, you can start manage your money by pressing the button of the user and input the money~~Have fun!!</p>

                <TextField
                  className="inputName"
                  type="text"
                  onChange={this.handleUserChange}
                  onKeyDown={this.handleUserChange}
                  hintText="Enter other member's name"
                  value={this.state.newPost.user}
                />
                <IconButton tooltip="Add group member"
                  className="add"
                  onClick={this.handleSubmit}
                > <Add />
                </IconButton>

              </div>
              <div className="I">I</div>
              {this.state.type === "borrow"
                ? (
                  <div className="borrowLend">
                    <FlatButton
                      label="borrow"
                      onClick={() => { this.handleSetType(0); }}
                      backgroundColor={lightBlue50}
                    />
                    <FlatButton
                      label="lend"
                      onClick={() => { this.handleSetType(1); }}
                    />
                  </div>
                )
                : (
                  <div className="borrowLend">
                    <FlatButton
                      label="borrow"
                      onClick={() => { this.handleSetType(0); }}
                    />
                    <FlatButton
                      label="lend"
                      onClick={() => { this.handleSetType(1); }}
                      backgroundColor={lightBlue50}
                    />
                  </div>
                )
              }
              <TextField
                type="text"
                className="inputMoney"
                onChange={this.handleContentChange}
                hintText="input the $$$"
                value={this.state.money}
              />
              <div className="fromTo">
                {this.state.type === 'borrow'
                  ? (
                    <p>from</p>
                  )
                  : (
                    <p>to</p>
                  )
                }
              </div>
              <div className="hint">
                {this.state.chipData.length === 0 &&
                  <p>(click the name below)</p>
                }
              </div>
              <div className="chip" style={this.style.wrapper}>
                {this.state.chipData.map(this.renderChip, this)}
                <IconButton tooltip="Done"
                  className="done"
                  onClick={this.handleSubmitMoney}
                > <Done />
                </IconButton>
              </div>
            </div>
            <div className="container">
              <ul>
                {this.state.postList.map(post =>
                  <div className="postList" key={post.id}>
                    <Post
                      post={post}
                      money={this.state.money}
                      handleSubmitComment={this.handleSubmitComment}
                      handleAddMoney={this.handleAddMoney}
                      handleDelMoney={this.handleDelMoney}
                      handleDeleteItem={this.handleDeleteItem}
                    />
                  </div>,
                )}
              </ul>
            </div>
          </div>
        }   
      </div>
    );
  }
}

export default Board;
