import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskName: '',
      description: '',
      status: 'pending',
      updateStatus: '',
      dueDate: new Date("2021-11-01"),
      editValue: null
    }
    this.onClickHanduler = this.onClickHanduler.bind(this);
  }
  onClickHanduler() {
    let date = dateFormate(this.state.dueDate);
    let data = {
      taskName: this.state.taskName,
      description: this.state.description,
      status: this.state.status,
      dueDate: date
    };
    axios.post('/api/tasks/create', { data })
      .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
      }).catch((err) => {
        console.error(err);
      });
    window.location.reload();
  }
  EditHanduler(id, status) {
    if (status) {
      let data = {
        status: status,
        id: id,
        updatedOn: dateFormate(new Date())
      };
      axios.put('/api/tasks/update', { data })
        .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
        }).catch((err) => {
          console.error(err);
        });
      window.location.reload();
    }
  }
  componentDidMount() {
    axios.get('/api/tasks')
      .then(res => {
        const tasks = res.data;
        console.log('tasks', tasks);
        this.setState({ tasks: tasks.tasks });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className='container'>
        <h4>Add/Edit Tasks </h4>
        <form >
          <div >
            <label>Task Name</label>
            <input type='text' name='taskName' value={this.state.taskName} onChange={(e) => this.setState({ taskName: e.target.value })} />
          </div>
          <div ><label>Description</label>
            <textarea type='text' name='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} /></div>
          <div > <label>Due</label>
            <DatePicker
              name='dueDate'
              selected={this.state.dueDate}
              minDate={new Date("2021-11-01")}
              maxDate={new Date("2021-11-07")}
              onChange={(date) => this.setState({ dueDate: date })}
            />
          </div>
          <div >
            <label>Status</label>
            <select name='status' disabled onChange={(e) => this.setState({ status: e.target.value })}>
              <option value={this.state.status}>{this.state.status}</option>
            </select>
          </div>
          <button onClick={this.onClickHanduler}>Save</button>
        </form>
        <br />
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(item => (
              this.state.editValue === item.id ? <tr key={item.id}>
                <td>{item.task_name}</td>
                <td>{item.description}</td>
                <td>{dateFormate(new Date(item.due_date))}</td>
                <td><select name='updateStatus' onChange={(e) => this.setState({ updateStatus: e.target.value })}>
                  <option defaultValue={item.status} >{item.status}</option>
                  <option value="closed">closed</option>
                </select></td>
                <td><button onClick={() => this.setState({ editValue: null }, () => this.EditHanduler(item.id, this.state.updateStatus))}> save</button></td>
              </tr> : <tr key={item.id}>
                <td>{item.task_name}</td>
                <td>{item.description}</td>
                <td>{dateFormate(new Date(item.due_date))}</td>
                <td>{item.status}</td>
                <td>{item.status === 'pending' ? <button onClick={() => this.setState({ editValue: item.id })}>edit</button> : null}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div >

    )
  }
}
function dateFormate(valueDate) {
  let today = valueDate;
  today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate('dd');
  return today;
}
export default App;
