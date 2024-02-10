const Header = (props) => <h1>Hello {props.course.name}</h1>
const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </div>
  )
}

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
  </>
)

export default Course
