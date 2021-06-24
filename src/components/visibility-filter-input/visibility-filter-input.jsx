import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions.js'

function VisibilityFilterInput(props) {
  return <Form.Control
    className="Search the movie"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search the movie"
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);