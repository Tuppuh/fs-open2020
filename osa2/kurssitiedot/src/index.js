import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => (
  <p>{props.part.name} {props.part.excercises}</p>
)

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => <Part key={part.name} part={part} />)}
    </>
  )
}

const Course = props => {
  const {course} = props  
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        excercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        excercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
