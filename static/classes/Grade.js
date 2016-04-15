import React from 'react';
import Subject from './Subject';

class Grade extends React.Component {
	constructor() {
		super();
		this.show = this.show.bind(this);
	}
	show(subject) {
		if (subject.semester === null || subject.semester === this.props.semester) {
			return (<Subject key={subject.engName} click={this.props.click} name={subject.name} engName={subject.engName} />);
		}
		return null;
	}

	render() {
		return (
			<li className="bold"><a className="collapsible-header  waves-effect waves-teal">{this.props.title}</a>
            	<div className="collapsible-body">
              		<ul>
              		{
              			this.props.subjects.map(this.show)
              		}
              		</ul>
            	</div>
          	</li>);
	}
}

export default Grade;