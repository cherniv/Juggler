import PropTypes from 'prop-types';
import React from 'react';

export default class BodyComponent extends React.Component{
	static contextTypes = {
    	loop: PropTypes.object,
    	scale: PropTypes.number
  	};

	componentDidMount() {
	    this.context.loop.subscribe(this.update);
	}

  	componentWillUnmount() {
    	this.context.loop.unsubscribe(this.update);
  	}
}
