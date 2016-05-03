import React from 'react';
import { connect } from 'react-redux';
import PureComponent from 'react-pure-render/component';
import { getCaptainStat } from './../../actions';
import ClientFantasy from './client-fantasy';


class ClientFantasyContainer extends PureComponent {
  render() {
    return (
      <ClientFantasy {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const returnState = {
    captainStat: state.captainStat,

  };
  return returnState;
}

function mapDispatchToProps(dispatch) {
  return {
    getCaptainStat: data => dispatch(getCaptainStat(data)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientFantasyContainer);
