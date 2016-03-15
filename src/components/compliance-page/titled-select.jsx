import React from 'react';
import ValidInput from '../input/valid-input';

class TitledSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      field,
      options,
      ...rest,
    } = this.props;

    return (
      <span>
        <h5>
          { this.props.title }
        </h5>
        <ValidInput type="select" options={ options } fieldBinding={ field } label="" { ...rest } />
      </span>
    );
  }
}

TitledSelect.propTypes = {
  field: React.PropTypes.object.isRequired,
  options: React.PropTypes.array.isRequired,
}

export default TitledSelect;