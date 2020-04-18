import React from "react";
import axios from 'axios';
const rowsName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: '',
      columns: '',
      response: [],
      seatRow: '',
      seatColumn: '',
      seats: {},
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
    axios.get(`http://localhost:3000/seats`, {params: {detail: detail}})
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
            ? "Row must be less then ${this.state.rows}"
            : '';
        break;
      case 'seatColumn': 
        errors.seatColumn = 
          !(value <= Number(this.state.columns))
            ? "Column must be less then ${this.state.columns}"
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
          <label>
            TotalRows:
            <input type="number" name="rows" value={this.state.rows} onChange={this.handleChange} required/>
          </label>
          <p>{this.state.errors.rows}</p>
          <label>
            TotalColumns:
            <input type="number" name="columns" value={this.state.columns} onChange={this.handleChange} required />
          </label>
          <p>{this.state.errors.columns}</p>
          { this.state.rows && this.state.columns &&    
          <>
            <label>
              SeatRow:
              <input type="number" name="seatRow" value={this.state.seatRow} onChange={this.handleChange} />
            </label>
            <p>{this.state.errors.seatRow}</p>
            <label>
              SeatColumn:
              <input type="number" name="seatColumn" value={this.state.seatColumn} onChange={this.handleChange} />
            </label>
            <p>{this.state.errors.seatColumn}</p>
            
            { this.state.seatRow && this.state.seatColumn &&    
              <button onClick={this.handleSubmit}>
                Add
              </button>
            }       
          </>
          }
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.response[0] && 
          <div>
            <p>Better Seats are</p>
              {this.state.response.map( (item, i) => {
              return <p key={i}>{item.id}{console.log(item, 'Item'+i)}</p>
            })}
          </div>
          }
        </div>
      </>
    );
  }
}

export default Home
