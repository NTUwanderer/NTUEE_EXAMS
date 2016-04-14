import React from 'react';

class Subject extends React.Component {
	constructor() {
		super();
		this.click = this.click.bind(this);
	}
	click() {
		this.props.click(this.props.engName);
	}
	render() {
		return (
			<li><a onClick={this.click}>{this.props.name}</a></li>);
	}
}

export default Subject;