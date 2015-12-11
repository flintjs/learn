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

  <wrap>
    <half class="in">
      <Header id={id} />
      <Editor example={example} onChange={passToFrame} />
    </half>
    <half>
      <iframe
        ref="frame"
        seamless
        onLoad={updateFrame}
        src="http://localhost:4001?inlineStyles"
      />
    </half>
  </wrap>

  $wrap = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  $half = {
    width: '50%',
    position: 'absolute',
    top: 0,
    left: '50%',
    bottom: 0
  }

  $in = {
    borderRight: '1px solid #ddd',
    left: 'auto'
  }

  $iframe = {
    display: 'flex',
    flexGrow: 1,
    border: 'none'
  }
}
