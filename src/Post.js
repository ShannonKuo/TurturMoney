import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';           
import { pink50, pink400, lightBlue50 } from 'material-ui/styles/colors';
import './App.css';
import Item from './Item';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleAddMoney = this.handleAddMoney.bind(this);
    this.handleDelMoney = this.handleDelMoney.bind(this);
  }

  handleAddMoney(id) {
    this.props.handleAddMoney(id);
  }
  handleDelMoney(id) {
    this.props.handleDelMoney(id);
  }
  render() {
    const accountings = this.props.post.accounting;
    const press = this.props.post.press;
    let str1 = "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/";
    let str2 = "/android/sticker.png;compress=true"
    let id = 13132741 + this.props.post.id;
    let str = str1.concat(id).concat(str2);

    return (
      <div className="displayPost">
        <div className="postName">
          <Avatar src={str} />
          {press === 0
            ? (
              <FlatButton
                label={this.props.post.user}
                onClick={() => { this.handleAddMoney(this.props.post.id); }}
                hoverColor={pink50}
              />
            )
            : (
              <FlatButton
                label={this.props.post.user}
                onClick={() => { this.handleDelMoney(this.props.post.id); }}
                backgroundColor={lightBlue50}
                hoverColor={pink50}
              />
            )
          }

        </div>
        <div className="postTime">
          <p>{this.props.post.time}</p>
          <hr color="#FFFFFF"></hr>
        </div>
        <ul className="comments">
          {accountings.map(accounting =>
            <div className="comment" key={accounting.id}>
              <Item
                item={accounting}
                listId={this.props.post.id}
                handleDeleteItem={this.props.handleDeleteItem}
              />
            </div>,
          )}
        </ul>
        <p>I lend {this.props.post.lend} to {this.props.post.user}</p>
        <p>I borrow {this.props.post.borrow} from {this.props.post.user}</p>
        <hr color="#FFFFFF"></hr>
        <p>total: {this.props.post.total}</p>
      </div>
    );
  }

}
export default Post;
Post.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    user: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    accounting: React.PropTypes.array.isRequired,
  }).isRequired,
  handleAddMoney: React.PropTypes.func.isRequired,
  handleDelMoney: React.PropTypes.func.isRequired,
};

