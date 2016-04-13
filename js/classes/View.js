import React from 'react';
import {Button, Card, Row, Col, Collapsible} from 'react-materialize';
import examLink from '../examLink';
class View extends React.Component {
	constructor() {
		super();
		this.state = {
			semester: false
		};
		this.clickOnSubject = this.clickOnSubject.bind(this);
		this.changeSemester = this.changeSemester.bind(this);
		console.log("examLink: ");
		console.log(examLink);
	}
	clickOnSubject(subjectName) {
		console.log("clickOnSubject: " + subjectName);
	}
	changeSemester(event) {
		this.setState({semester: !this.state.semester});
	}
	getTitle(i) {
		if (i === 0)	return "大一必修";
		if (i === 1)	return "大二必修";
		if (i === 2)	return "大三必修";
		if (i === 3)	return "選修課程";
		return "Error Title";
	}
	render() {
		return (
			<div>
				<header>
			        <ul id="nav-mobile" className="side-nav fixed">
			          <li style={{margin: 0, padding: 0, lineHeight: 0, backgroundColor: "#FFFFFF"}}>
			              <img src="./images/left_title.png" width="66%" style={{marginTop: 0, marginRight: 17 + '%', marginBottom: 0, marginLeft: 17 + '%'}} />
			          </li>

			          <li className="no-padding">
			            <ul className="collapsible collapsible-accordion">
		            	{
		            		this.props.grades.map((subjects, i) => <Grade key={this.getTitle(i)} title={this.getTitle(i)} semester={this.state.semester} subjects={subjects} click={this.clickOnSubject} />)
		            	}
			            </ul>
			          </li>
			        </ul>
			      </header>

			      
			      <main>
			        <div className="section no-pad-bot" id="index-banner" style={{padding: 0, height: 115}}>
			          <nav style={{height: 100 + '%', backgroundColor: "#7e57c2"}}>
			            <div id="title" className="container" style={{position: "relative", top: 24}}>
			              <div className="row">
			                <div className="col center" style={{paddingLeft:200}}>
			                  <h4 className="header center" style={{verticalAlign: "center"}}>考古題系統</h4>
			                </div>
			                <div className="col s12 m5 right">
			                  <div className="right">
			                    <ul>
			                      <li>
			                        <a onClick={this.changeSemester}>{this.state.semester?"下學期":"上學期"}</a>
			                      </li>
			                    </ul>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </nav>
			        </div>



			        <div className="container" style={{width: 100 + '%', margin: 0, padding: 0, maxWidth: 2000}}>
			          <div className="section" style={{margin: 0, padding: 0}}>
			            <div id="main_container" className="row" style={{margin: 0}}>
			              <div className="col hide-on-small-only m3 l2" style={{marginTop: 2.5, paddingLeft:0, position: "relative", float: "right", width: 26 + '%'}}>
			                <div style={{height: 1}}>
			                  <ul id="right_bar" className="section " style={{marginTop: 2.5 + '%', marginRight: 0, marginBottom: 0, marginLeft: 0, padding: 0}}>
			    				<button id="btn-submit" className="btn waves-effect waves-light" style={{width: 90 + '%', marginBottom: 10}} onclick="submit()">Download<i className="material-icons right">send</i></button>
			                  </ul>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </main>
			      <a id="for_download" style={{display: "none"}}></a>
			</div>); 
	}
}

View.defaultProps = {
	grades: [
		// semester false: first semester
		[
			{name: "計算機程式", semester: false},
			{name: "計算機概論", semester: true},
			{name: "工程數學-線性代數", semester: true}
		],
		[
			{name: "電子學一", semester: false},
			{name: "電路學", semester: false},
			{name: "工程數學-微分方程", semester: false},
			{name: "交換電路與邏輯設計", semester: false},
			{name: "電子電路實驗一", semester: false},
			{name: "電子學二", semester: true},
			{name: "電磁學一", semester: true},
			{name: "信號與系統", semester: true},
			{name: "機率與統計", semester: true},
			{name: "工程數學-複變", semester: true},
			{name: "離散數學", semester: true}
		],
		[
			{name: "電子學三", semester: false},
			{name: "電磁學二", semester: false},
			{name: "電子電路實驗三", semester: false}
		],
		[
			{name: "演算法", semester: null},
			{name: "生醫工程概論", semester: null},
			{name: "計算機結構", semester: null},
			{name: "電腦網路導論", semester: null},
			{name: "控制系統", semester: null},
			{name: "資料結構", semester: null},
			{name: "微波系統導論", semester: null},
			{name: "近代物理", semester: null},
			{name: "物件導向程式設計", semester: null},
			{name: "通訊原理", semester: null},
			{name: "電力工程導論", semester: null},
			{name: "半導體製程", semester: null},
			{name: "積體電路設計", semester: null}
		]
	]
}

class Grade extends React.Component {
	constructor() {
		super();
		this.show = this.show.bind(this);
	}
	show(subject) {
		if (subject.semester === null || subject.semester === this.props.semester) {
			return (<Subject key={subject.name} click={this.props.click} name={subject.name} />);
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

class Subject extends React.Component {
	constructor() {
		super();
		this.click = this.click.bind(this);
	}
	click() {
		this.props.click(this.props.name);
	}
	render() {
		return (
			<li><a onClick={this.click}>{this.props.name}</a></li>);
	}
}

export default View;