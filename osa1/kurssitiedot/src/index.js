import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  console.log(props)  
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

const Total = (props) => {
  return(
    <p> Number of excercises {props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10
      },
      {
        name: 'Using props to pass data',
        excercises: 7
      },
      {
        name: 'State of a component',
        excercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
