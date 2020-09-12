import React from 'react';

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  const {part} = props
  return(
    <p>{part.name} {part.excercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = (props) => {
  const {parts} = props  
  const total = parts.reduce((result, item) => {return result + item.excercises}, 0)
  return(
    <p>Total of {total} excercises</p>
  )
}

const Course = props => {
  const {course} = props  
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
