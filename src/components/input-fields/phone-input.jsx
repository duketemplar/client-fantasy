import React from 'react';
import { formatNumber, formatNumberByType } from '../../helpers/utils';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const KEYS = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  PLUS: 43,
  A: 65,
  Z: 90,
  ZERO: 48,
  NINE: 57,
  SPACE: 32,
  BSPACE: 8,
  TAB: 9,
  DEL: 46,
  CTRL: 17,
  CMD1: 91, // Chrome
  CMD2: 224, // FF
};

const legibleKey = key => {
  return (key >= KEYS.ZERO && key <= KEYS.NINE) || key == KEYS.BSPACE;
};

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectionStart: 0,
      selectionEnd: 0,
      length: 0,
      spaceChange: 0,
      leftSpaceChange: 0,
    };
  }

  keyDown(event) {
    this.setState({
      lastKey: event.keyCode,
    });
  }

  inputChanged(event) {

    let number = formatNumber(event.target.value, 'SE', false, false, legibleKey(this.state.lastKey));

    let spaceChange = (number.slice(0, event.target.selectionStart).match(/\s/g) || []).length - (event.target.value.slice(0, event.target.selectionStart).match(/\s/g) || []).length;

    this.setState({
      value: number,
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd,
      length: number.length,
      spaceChange: spaceChange,
    });
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    let selectionIndex;
    selectionIndex = this.state.selectionStart + this.state.spaceChange;
    this.refs.inputField.setSelectionRange(selectionIndex, selectionIndex);
  }

  render() {
    return (
      <div className="form-group">
        <label className="control-label">
          <span>{ this.props.label }</span>
        </label>
        <input  name={ this.props.name }
                ref="inputField"
                type="tel"
                label={ this.props.label }
                placeholder={ this.props.placeholder }
                className="form-control"
                onChange={this.inputChanged.bind(this)}
                value={ this.state.value } />

      </div>
    );
  }
}

PhoneInput.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
};

export default PhoneInput;
