import React from 'react';
import './list-box.scss';

class ListBox extends React.Component {

  renderItems() {
    return (
      this.props.itemTexts
      .map(item => {
        return (
          <li>
            <span className="list-box__bullet"></span>
            <span className="list-box__item-text">{ item }</span>
          </li>
        );
      })
    );
  }

  render() {
    const BackGroundImage = this.props.backgroundImage;
    return (
      <div className="list-box" style={ { backgroundImage: `url(${BackGroundImage})` } }>
        <div clasName="list-box__container">
          <h3 className="list-box__header">{ this.props.header }</h3>
          <ul>
            { this.renderItems() }
          </ul>
        </div>
      </div>
    );
  }
}

ListBox.propTypes = {
  itemTexts: React.PropTypes.array.isRequired,
  header: React.PropTypes.string.isRequired,
  backgroundImage: React.PropTypes.object,
};

export default ListBox;
