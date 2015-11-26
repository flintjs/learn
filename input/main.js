import lessons from './lessons'

view Main {
  <Header />
  // <Next />
  <Body route="/lesson/:id" />
  <Sidebar />

  $ = {
    flexGrow: 1
  }
}

view Body {
  let frame
  let example

  on.mount(() => {
    frame = view.refs.frame

    let id = view.props.params.id
    example = lessons[id]

    passToFrame(example.code)
  })

  function passToFrame(val) {
    frame.contentWindow.postMessage(val, '*')
  }

  <body>
    <half>
      <Editor onChange={passToFrame} />
    </half>
    <half>
      <iframe ref="frame" height={1000} seamless src="http://localhost:4001?inlineStyles" />
    </half>
  </body>

  $ = {
    flexFlow: 'row',
    flexGrow: 1
  }

  $half = {
    flexGrow: 1,
    width: '50%'
  }

  $iframe = {
    border: 'none'
  }
}