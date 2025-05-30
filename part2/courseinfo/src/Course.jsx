import React from "react";

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => (
  <p>
    <b>
      total of {parts.reduce((acc, c) => (acc += c.exercises), 0)} exercises
    </b>
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
