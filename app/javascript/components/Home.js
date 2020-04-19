import React from "react";
import axios from 'axios';
const rowsName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 50,
      response: [],
      seatRow: '',
      seatColumn: '',
      seats: {
        "a1": {"id": "a1","row": "a","column": 1,"status": "AVAILABLE"},
        "b5": {"id": "b5","row": "b","column": 5,"status": "AVAILABLE"},
        "h7": {"id": "h7","row": "h","column": 7,"status": "AVAILABLE"}
      },
      errors: {
        rows: '',
        columns: '',
        seatRow: '',
        seatColumn: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleresponse = this.handleresponse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleresponse(event) {
    let detail = {"venue": {"layout": {"rows": this.state.rows, "columns": this.state.columns}},
                  "seats": this.state.seats}
    axios.get(`/seats`, {params: {detail: detail}})
      .then(res => {
        console.log(res, 'Res')
        this.setState({response: res.data.seats });
      })
    event.preventDefault();
  }

  handleSubmit(event) {
    let seats = this.state.seats
    let key = rowsName[this.state.seatRow-1] + this.state.seatColumn
    seats[key] = {'id': key, 'row': rowsName[this.state.seatRow-1], 'column': this.state.seatColumn, "status": "AVAILABLE"}
    this.setState({seats: seats, seatRow: '', seatColumn: ''})
    event.preventDefault();
  }

  removeSubmit(event, item) {
    let seats = this.state.seats
    delete seats[item.id]
    this.setState({ seats: seats })
    event.preventDefault();
  }

  handleChange(event){
    event.preventDefault();
    let errors = this.state.errors;
    let name = event.target.name
    let value = event.target.value

    switch (name) {
      case 'rows': 
        errors.rows = 
          !(value > 0 && value <= 26)
            ? 'Rows must be between 1 to 26!'
            : '';
        break;
      case 'columns': 
        errors.columns = 
          (value > 0)
            ? ''
            : 'Columns must be greater then 0!';
        break;
      case 'seatRow': 
        errors.seatRow = 
          !(value <= Number(this.state.rows))
            ? "Row must be less or equal to " + this.state.rows
            : '';
        break;
      case 'seatColumn': 
        errors.seatColumn = 
          !(value <= Number(this.state.columns))
            ? "Column must be less or equal to" + this.state.columns
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value}, ()=> {console.log(errors)})
  }

  render () {
    console.log(this.state)
    return (
      <>
        <form onSubmit={this.handleresponse}>
          <div style={formRow}>
            <div style={formfield}>
              <label>
                Total Seat Rows:
                <p>
                  <input type="number" name="rows" value={this.state.rows} onChange={this.handleChange} required/>
                </p>
              </label>
              <p>{this.state.errors.rows}</p>
            </div>
            <div style={formfield}>
              <label>
                Total Seat Columns:
                <p><input type="number" name="columns" value={this.state.columns} onChange={this.handleChange} required /></p>
              </label>
              <p>{this.state.errors.columns}</p>
            </div>   
          </div>
          {this.state.seats && 
          <div>
            <b>Selected Seats are: </b>
              {Object.values(this.state.seats).map( (item, i) => {
              return <div>
                <span style={line} key={i}>{item.id}{console.log(item, 'Item'+i)}</span>
                <a style={{color: 'red', cursor: 'pointer'}} onClick={this.removeSubmit.bind(this, event, item)}>x</a>
              </div>
            })}
          </div>
          }
          <h4>To add more seats Please add seat number below:</h4>
          <div style={formRow}>
            <div style={formfield}>
              <label>
                Seat Row:
                <p><input type="number" name="seatRow" value={this.state.seatRow} onChange={this.handleChange} disabled={!(this.state.rows && this.state.columns)}/></p>
              </label>
              <p>{this.state.errors.seatRow}</p>
            </div>
            <div style={formfield}>
              <label>
                Seat Column:
                <p><input type="number" name="seatColumn" value={this.state.seatColumn} onChange={this.handleChange} disabled={!(this.state.rows && this.state.columns)}/></p>
              </label>
              <p>{this.state.errors.seatColumn}</p>
            </div>
            <div style={formfield}><button style={{marginTop: 30}} onClick={this.handleSubmit}  disabled={!(this.state.seatRow && this.state.seatColumn)}>Add Seat</button></div>
          </div>
          <br />
          <div style={formfield}><input style={{color: 'green'}} type="submit" value="Get Best Seat"/></div>
        </form>
        <div>
          {this.state.response[0] && 
          <div>
            <h5>Best Seats for you is <b>{this.state.response[0].id}</b></h5>
            <h5>Better Seats are:</h5>
              {this.state.response.map( (item, i) => {
              return (i > 0) && <span style={line} key={i}>{item.id}</span>
            })}
          </div>
          }
        </div>
      </>
    );
  }
}

const formfield = {
  width: '18%',
  float: 'left',
  paddingLeft: 10,
  paddingRight: 10
}

const formRow = {
  width: '100%',
  display: "inline-block"
}

const line = {
  display: "inline-block",
  verticalAlign: "middle",
  float: "left",
  marginRight: 10,
  paddingLeft: 10,
  paddingRight: 10
}

export default Home
