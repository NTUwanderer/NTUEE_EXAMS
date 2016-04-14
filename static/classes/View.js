import React from 'react';
import {Button} from 'react-materialize';
import examLink from '../js/examLink';

import Grade from './Grade';
import ExamCard from './ExamCard';

console.log(io);
var socket = io.connect();

class View extends React.Component {
	constructor() {
		super();
		for (let i = 0, length = examLink.length; i < length; ++i)
			examLink[i].appear = false;
		this.state = {
			semester: false,
			exams: examLink,
			chosen: []
		};
		this.clickOnSubject = this.clickOnSubject.bind(this);
		this.changeSemester = this.changeSemester.bind(this);
		this.examsMap = this.examsMap.bind(this);
		this.choosePdf = this.choosePdf.bind(this);
		this.deletePdfHandler = this.deletePdfHandler.bind(this);
		this.deletePdf = this.deletePdf.bind(this);
		this.submit = this.submit.bind(this);
		console.log("examLink: ");
		console.log(examLink);
	}
	clickOnSubject(subjectName) {
		console.log("clickOnSubject: " + subjectName);
		let exams = this.state.exams;
		for (let i = 0, length = exams.length; i < length; ++i) {
			if (exams[i].name === subjectName) {
				exams[i].appear = !(exams[i].appear);
				this.setState({exams: exams});
				break;
			}
		} 
	}
	changeSemester(event) {
		this.setState({semester: !this.state.semester});
	}
	examsMap(exam) {
		if (exam.appear) {
			return (<ExamCard key={exam.name} data={exam} choose={this.choosePdf} delete={this.clickOnSubject} />);
		}
		return null;
	}
	choosePdf(subject, typ, idx, year) {
		let string = subject + '@' + typ + '-' + (idx + 1) + '_' + year,
			chosen = this.state.chosen,
			find = false;
		for (let i = 0, length = chosen.length; i < length; ++i) {
			if (chosen[i] === string) {
				find = true;
				break;
			}
		}
		if (!find)	chosen.push(string);
		this.setState({chosen: chosen});
	}
	deletePdf(string) {
		let chosen = this.state.chosen;
		for (let i = 0, length = chosen.length; i < length; ++i) {
			if (chosen[i] === string) {
				chosen.splice(i, 1);
				break;
			}
		}
		this.setState({chosen: chosen});
	}
	deletePdfHandler(string) {
		function func() {
	      this.deletePdf(string);
	    }
	    func = func.bind(this);
	    return func;
	}
	submit() {
		console.log("submit clicked...");
		let strings = this.state.chosen;
		socket.emit('submit', {id: "b00000000", data: strings}, function(goodStat, data){
		    if(goodStat == 1){
		      console.log("Start download.");
		      //console.log("data : ", data);
		      var blob = b64toBlob(data, "application/octet-stream");

		      saveAs(blob, "b00000000.zip");
		      /*var download = document.getElementById('for_download');
		      download.href = position;
		      download.click();*/
		    }
		});
		this.setState({chosen: []});
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
			              <img src="./static/images/left_title.png" width="66%" style={{marginTop: 0, marginRight: 17 + '%', marginBottom: 0, marginLeft: 17 + '%'}} />
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
						  <div className="col hide-on-small-only m3 l2" style={{marginTop: 2.5, paddingLeft:0, position: "relative", float: "right", width: 26 + '%', marginTop: 5 + '%'}}>
			                <div style={{height: 1}}>
			                  <ul id="right_bar" className="section " style={{marginTop: 2.5 + '%', marginRight: 0, marginBottom: 0, marginLeft: 0, padding: 0}}>
			    				<button className="btn waves-effect waves-light" style={{width: 90 + '%', marginBottom: 10}} onClick={this.submit}>Download<i className="material-icons right">send</i></button>
			                  	{
			                  		this.state.chosen.map(item => (
			                  			<li style={{height: 30}} key={item}>
			                  				<i onClick={this.deletePdfHandler(item)} className="material-icons left red-text waves-effect waves-light" style={{position: 'relative', display: 'inline-block', float: 'left', padding: 0, margin: 0, cursor: 'pointer'}}>close</i>
			                  				<a style={{lineHeight: 26 + 'px', cursor: 'default', color: 'black', paddingLeft: 3}}>{item}</a>
			                  			</li>))
			                  	}
			                  </ul>
			                </div>
			              </div>
			              	{
		            			this.state.exams.map(this.examsMap)
		            		}
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
			{name: "計算機程式", engName: "cprogram", semester: false},
			{name: "計算機概論", engName: "cscience", semester: true},
			{name: "工程數學-線性代數", engName: "linear", semester: true}
		],
		[
			{name: "電子學一", engName: "electron1", semester: false},
			{name: "電路學", engName: "circuit", semester: false},
			{name: "工程數學-微分方程", engName: "diff", semester: false},
			{name: "交換電路與邏輯設計", engName: "logic", semester: false},
			{name: "電子電路實驗一", engName: "eexp1", semester: false},
			{name: "電子學二", engName: "electron2", semester: true},
			{name: "電磁學一", engName: "electrom1", semester: true},
			{name: "信號與系統", engName: "signal", semester: true},
			{name: "機率與統計", engName: "probability", semester: true},
			{name: "工程數學-複變", engName: "complex", semester: true},
			{name: "離散數學", engName: "discrete", semester: true}
		],
		[
			{name: "電子學三", engName: "electron3", semester: false},
			{name: "電磁學二", engName: "electrom2", semester: false},
			{name: "電子電路實驗三", engName: "eexp3", semester: false}
		],
		[
			{name: "演算法", engName: "algorithm", semester: null},
			{name: "生醫工程概論", engName: "bioEng", semester: null},
			{name: "計算機結構", engName: "carch", semester: null},
			{name: "電腦網路導論", engName: "cnetwork", semester: null},
			{name: "控制系統", engName: "control", semester: null},
			{name: "資料結構", engName: "DSnP", semester: null},
			{name: "微波系統導論", engName: "microEng", semester: null},
			{name: "近代物理", engName: "mPhy", semester: null},
			{name: "物件導向程式設計", engName: "OOP", semester: null},
			{name: "通訊原理", engName: "PC", semester: null},
			{name: "電力工程導論", engName: "powerSys", semester: null},
			{name: "半導體製程", engName: "SCTech", semester: null},
			{name: "積體電路設計", engName: "VLSI", semester: null}
		]
	]
}

export default View;