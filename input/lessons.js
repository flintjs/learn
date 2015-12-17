export default [
  {
    title: "Welcome",
    code:
`view Main {
  <welcome>
    <h1>Hello World</h1>
    <h2>Welcome to Flint</h2>
  </welcome>
}`
  },
  {
    title: "Styles",
    code:
`view Main {
  <welcome>
    <h1>Hello World</h1>
    <h2>Welcome to Flint</h2>
  </welcome>

  $welcome = {
    padding: 20,
  }

  $h1 = {
    fontSize: 60,
    color: 'rgba(0,0,0,0.2)'
  }

  $h2 = { marginLeft: 60, }
}`
  },
  {
    title: "Basic State",
    code:
`view Main {
  // try increasing clicks then changing this code
  let clicks = 0

  <welcome>
    <h1>Clicked {clicks} times</h1>
    <h2 if={clicks > 5}>You click a lot!</h2>
    <button onClick={() => clicks++}>a little more</button>
    <button onClick={() => clicks--}>a little less</button>
  </welcome>

  $h1 = { marginLeft: 85 }
  $h2 = { marginLeft: 125 }

  $button = {
    marginLeft: 30,
    fontSize: 30,
  }
}`
  },
  {
    title: "Multiple Views",
    code:
`view Main {
  <welcome>
    <Greetings name="Nick" />
    <Greetings name="Nate" />
    <Greetings name="Everyone" />
  </welcome>
}

view Greetings {
  <h1>Hello {view.props.name}</h1>
}`
  },
  {
    title: "Multiplication",
    code:
`let randTo = x => Math.floor(Math.random() * x)

view Main {
  let first, second, answer
  let streak = 0
  let guess = ''

  next()

  function next() {
    guess = ''
    first = randTo(15)
    second = randTo(15)
    answer = first * second
  }

  function check() {
    let correct = +guess === answer
    if (correct) streak++
    else streak = 0
    next()
  }

`+`  <h3>Multiply!</h3>
`+`  <streak if={streak > 0}>
    Streak: {streak}
  </streak>
`+`  <question>
    {first} times {second} is:
  </question>
`+`  <input
    placeholder="Enter your answer"
    sync={guess}
    onEnter={check}
  />

  $ = {
    margin: [20, 0],
    padding: [20, 0],
    border: '1px solid #ddd',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 28
  }

  $question = {
    flexFlow: 'row',
    margin: [15, 0]
  }

  $streak = {
    flexFlow: 'row',
    margin: [10, 'auto'],
    fontSize: 24,
    color: 'green'
  }

  $input = {
    background: '#eee',
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: [0, 'auto'],
    borderRadius: 10,
    border: 'none',
    padding: 10
  }
}`
  }
]



// view Main {
//   let data = null
//
//   async function load() {
//     data = await fetch.json('http://api.are.na/v2/channels/barnrazer')
//   }
//
//   load()
//
//   ;<h1>Hello {JSON.stringify(data)}</h1>
// }
