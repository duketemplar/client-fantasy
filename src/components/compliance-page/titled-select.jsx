import React from 'react';
import { Input } from 'nordnet-ui-kit';

class TitledSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      options,
      ...rest,
    } = this.props;

    return (
      <span>
        <h5>
          { this.props.title }
        </h5>
        <Input type="select" options={ options } value={ value } label="" { ...rest } />
      </span>
    );
  }
}

TitledSelect.propTypes = {
  value: React.PropTypes.object.isRequired,
  options: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
};

export default TitledSelect;
