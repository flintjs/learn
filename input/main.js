import lessons from './lessons'
import { getSource } from './gist'
import state from './state'

let production = window.location.hostname == 'flintjs.com'

function setGist() {
  state.gist = window.location.search.indexOf('?src=') > -1
  if (window.location.pathname == '/' && !state.gist) {
    Flint.router.go('/lessons/0')
  }
}

view Main {
  setGist()
  Flint.router.onChange(setGist)

  // <Next />
  <Body route="/lessons/:id" />
  <Body gist route="/" />
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
    state.lessonID = id
    if (view.props.gist) {
      let source = window.location.href.split('?src=')[1]
      state.current = { title: "Gist", code: decodeURI(source) }
    } else {
      state.current = lessons[id]
    }
  })

  on.mount(() => {
    frame = view.refs.frame
    updateFrame()
  })

  function updateFrame() {
    passToFrame(state.current.code)
  }

  function passToFrame(val) {
    state.current.code = val
    if (frame) frame.contentWindow.postMessage(val, '*')
  }

  <wrap>
    <half class="in">
      <Header id={id} />
      <Editor example={state.current} onChange={passToFrame} />
    </half>
    <half>
      <iframe
        ref="frame"
        seamless
        onLoad={updateFrame}
        src={production ? 'http://learnout.flintjs.com' : 'http://localhost:4001?inlineStyles'}
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
