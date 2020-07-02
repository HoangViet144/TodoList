import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      queryTasks: []
    }
  }
  deleteTask = (ind) => {
    this.state.tasks.splice(ind, 1)
    let taskAfterDelete = this.state.tasks
    let queryTaskAfterDelete = taskAfterDelete.map((el, index) => {
      return { ind: index, task: el }
    })
    this.setState({ tasks: taskAfterDelete, queryTasks: queryTaskAfterDelete })
  }
  createTask = (task) => {
    let taskAfterCreate = [...this.state.tasks, task]
    let queryTaskAfterCreate = taskAfterCreate.map((el, index) => {
      return { ind: index, task: el }
    })
    this.setState({ tasks: taskAfterCreate, queryTasks: queryTaskAfterCreate })
  }
  findTask = (substr) => {
    let foundTask = []
    this.state.tasks.forEach((el, ind) => {
      if (el.includes(substr))
        foundTask.push({ task: el, ind: ind })
    })
    this.setState({ queryTasks: foundTask })
  }
  render() {
    return (
      <div className="App" >
        <div><Header numTask={this.state.tasks.length} /></div>
        <div className="Row">
          <div className="Column1">
            <TaskList tasks={this.state.queryTasks} deleteFunction={this.deleteTask} />
          </div>
          <div className="Column2">
            <CreateTaskForm createFunction={this.createTask} />
            <Search findFunction={this.findTask} />
          </div>
        </div>
      </div>
    )
  }
}
const Search = (props) => {
  return (
    <div>
      <input type='text' placeholder="find a task..." onChange={e => {
        props.findFunction(e.target.value)
      }} />
    </div>
  )
}
const Task = (props) => {
  return (
    <div className="item">
      Task {props.id}:  {props.content}
      <button className="delete" onClick={() => {
        props.deleteFunction(props.id)
        console.log(props.id)
      }}>
        Delete this task
      </button>
    </div>
  )
}
const Header = (props) => {
  return (
    <div className="Header">
      <h1>You have {props.numTask} tasks to do.</h1>
    </div>
  )
}
const TaskList = (props) => {
  let taskList = props.tasks.map((task) => {
    return (
      <Task content={task.task} id={task.ind} key={task.ind} deleteFunction={props.deleteFunction} />
    )
  })
  return <div className="list-item">{taskList}</div>;
}

class CreateTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }
  submitNewTask = (event) => {
    event.preventDefault()
    if (this.state.content === '')
      return
    this.props.createFunction(this.state.content)
    this.setState({ content: '' })
  }
  render() {
    return (
      <form onSubmit={this.submitNewTask}>
        <input type='text' placeholder="Task's content" value={this.state.content} onChange={(event) => {
          const tmp = event.target.value
          this.setState({ content: tmp })
        }} />
        <button>Create a new task</button>
      </form>
    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
