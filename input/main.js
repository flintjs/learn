import lessons from './lessons'

view Main {
  // <Next />
  <Body route="/lesson/:id" />
  // <Sidebar />

  $ = {
    flexGrow: 1
  }
}

view Body {
  let id
  let frame
  let example

  on.props(() => {
    id = +view.props.params.id
    example = lessons[id]
  })

  on.mount(() => {
    frame = view.refs.frame
    updateFrame()
  })

  function updateFrame() {
    passToFrame(example.code)
  }

  function passToFrame(val) {
    if (frame) frame.contentWindow.postMessage(val, '*')
  }

  <half class="in">
    <Header id={id} />
    <Editor example={example} onChange={passToFrame} />
  </half>
  <half>
    <iframe
      ref="frame"
      height={1000}
      seamless
      onLoad={updateFrame}
      src="http://localhost:4001?inlineStyles"
    />
  </half>

  $ = {
    flexFlow: 'row',
    flexGrow: 1
  }

  $half = {
    flexGrow: 1,
    width: '50%'
  }

  $in = {
    borderRight: '1px solid #ddd'
  }

  $iframe = {
    border: 'none'
  }
}