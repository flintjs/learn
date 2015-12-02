const example1 =
`view Main {
  <h1>Hello World</h1>
}`

const example2 =
`view Main {
  <Child />
}

`+`view Child {
  <h2>Child View</h2>
}`

export default [
  {
    title: "Welcome",
    code: example1
  },
  {
    title: "Second",
    code: example2
  }
]