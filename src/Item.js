import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
class Item extends Component {
  render() {
    const item = this.props.item;
    const listId = this.props.listId;
    return (
      <div>
        <div className="comment">
          <IconButton
            iconClassName="material-icons"
            tooltip="delete"
            onTouchTap={(evt) => {this.props.handleDeleteItem(listId, item.id, evt)}}
          > delete
          </IconButton>
          <p className="item">{item.content}</p>
        </div>
        <div className="replyTime">
          <p>{item.type}</p>
          <p>{item.time}</p>
        </div>
      </div>
    );
  }
}
Item.propTypes = {
};

export default Item;
