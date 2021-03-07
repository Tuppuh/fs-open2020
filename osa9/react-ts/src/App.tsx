import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface DescribedCoursePartBase extends CoursePartBase {
    description: string
  }

  interface CourseNormalPart extends DescribedCoursePartBase {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends DescribedCoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends DescribedCoursePartBase {
    type: "special";
    requirements: string[];
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  interface CourseInterface {
    name: string;
    exerciseCount: number
  }

  /**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

  const Part = ({ part }: {part: CoursePart}) => {
      switch (part.type) {
        case "groupProject":
          return (<div>
            <b>{part.name} {part.exerciseCount}</b>
            <div>group projects: {part.groupProjectCount}</div>
            <br/>
            </div>);
        case "submission":
          return (<div>
            <b>{part.name} {part.exerciseCount}</b>
            <div>{part.description}</div>
            <div>{part.exerciseSubmissionLink}</div>
            <br/>
          </div>);
        case "normal":
          return (<div>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <br/>
          </div>);
        case "special":
          return (<div>
            <b>{part.name} {part.exerciseCount}</b>
            <div>requirements: 
            {part.requirements.map(r => r + ' ')}
            </div>
          </div>);
        default:
          return assertNever(part)
      }
  }

  const Header = ({ headerText }: { headerText: string }) => {
    return <h1>{headerText}</h1>
  }
  
  const Content = ({ parts }: {parts: CoursePart[]}) => {
    return (
      <>
        {parts.map(part => <Part key={part.name} part={part}/>)}
      </>
    )
  }

  const Total = ({ parts }: {parts: CourseInterface[]}) => {
    return(
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }
  

  return (
    <div>
      <Header headerText={courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  );
};

export default App;