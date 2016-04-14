import React from 'react';
import {Card, Col} from 'react-materialize';

var ref = React.DOM;
var div = ref.div,
  img = ref.img,
  span = ref.span,
  ul = ref.ul,
  li = ref.li,
  par = React.DOM.p,
  icon = React.DOM.i,
  ahref = React.DOM.a;

class ExamCard extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		curLoc: []
  	};
    this.delete = this.delete.bind(this);``
  }
  navFront(z) {
    this.state.curLoc.push(z);
    this.setState({curLoc: this.state.curLoc});
  }
  navPop(x) {
    this.state.curLoc = this.state.curLoc.slice(0, x);
    this.setState({curLoc: this.state.curLoc});
  }
  getLocName() {
    var len, res;
    len = this.state.curLoc.length;
    res = this.state.curLoc.slice(0);
    if (len === 2) {
      res[1] = this.props.data[res[0]][res[1]].name;
    }
    return res;
  }
  download(typ, idx, year) {
  	this.props.choose(this.props.data.name, typ, idx, year);
    return console.log("Download = " + typ + ", " + idx + ", " + year);
  }
  delete() {
    this.props.delete(this.props.data.name);
  }
  render() {
    var bread, breadItemClass, c1, c2, chosen, depth, ex, panel, panelItemClass, ref1;
    ex = this.props.data;
    console.log(ex);
    depth = this.state.curLoc.length;
    console.log(depth);
    breadItemClass = 'breadcrumb black-text cursor';

    panelItemClass = 'collection-item btn-flat no-transform';
    if (depth === 0) {
      panel = div({
        className: 'collection'
      }, ahref({
        className: panelItemClass,
        onClick: (function(_this) {
          return function() {
            return _this.navFront('quiz');
          };
        })(this)
      }, 'Quiz'), ahref({
        className: panelItemClass,
        onClick: (function(_this) {
          return function() {
            return _this.navFront('exam');
          };
        })(this)
      }, 'Exam'));
    } else if (depth === 1) {
      chosen = this.state.curLoc[0];
      panel = div({
        className: 'collection'
      }, ex[chosen].map((function(_this) {
        return function(e, i) {
          return ahref({
            className: panelItemClass,
            onClick: function() {
              return _this.navFront(i);
            }
          }, e.name);
        };
      })(this)));
    } else if (depth === 2) {
      ref1 = [this.state.curLoc[0], this.state.curLoc[1]], c1 = ref1[0], c2 = ref1[1];
      panel = div({
        className: 'collection'
      }, ex[c1][c2].file.map((function(_this) {
        return function(e) {
          return ahref({
            className: panelItemClass,
            onClick: function() {
              return _this.download(c1, c2, e);
            }
          }, e);
        };
      })(this)));
    }
    return (
    <Col m={4} s={12} style={{position: 'relative', display: 'inline-block', marginTop: 2.5 + '%' , marginRight: 0, marginBottom: 0, marginLeft: 2.5 + '%', width: 33 + '%', height: 40 + '%'}}>
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">
              <span style={{color: 'black'}}>{ex.name}</span>
            </span>
            <i onClick={this.delete} className="material-icons left red-text waves-effect waves-light" style={{position: 'absolute', display: 'inline-block', right: 5 + '%', padding: 0, margin: 0, cursor: 'pointer'}}>close</i>
            <div className="breadcol" style={{lineHeight: 40 + "px"}}>
              <a className={breadItemClass} onClick={
                (function(_this) {
                    return function() {
                      return _this.navPop(0);
                    };
                })(this)
              }>home</a>
              {
                this.getLocName().map((function(_this) {
                  return function(x, i) {
                    return ahref({
                      className: breadItemClass,
                      onClick: function() {
                        return _this.navPop(i + 1);
                      }
                    }, x);
                  };
                })(this))
              }
            </div>
            {
              panel
            }
          </div>
        </div>
    </Col>
    );
    return (
	    <Col m={4} s={12} style={{position: 'relative', display: 'inline-block', marginTop: 2.5 + '%' , marginRight: 0, marginBottom: 0, marginLeft: 2.5 + '%', width: 33 + '%', height: 40 + '%'}}>
		    <Card textClassName='black-text' title={ex.name}>
		    	<div className="breadcol" style={{lineHeight: 40 + "px"}}>
			    	<a className={breadItemClass} onClick={
			    		(function(_this) {
					        return function() {
					          return _this.navPop(0);
					        };
					    })(this)
			    	}>home</a>
			    	{
			    		this.getLocName().map((function(_this) {
					      return function(x, i) {
					        return ahref({
					          className: breadItemClass,
					          onClick: function() {
					            return _this.navPop(i + 1);
					          }
					        }, x);
					      };
					    })(this))
			    	}
			    </div>
			    {
			    	panel
			    }
		    </Card>
		</Col>);
    
  }
}

export default ExamCard;