import lessons from './lessons'
import { save, getSource } from './gist'

import state, { gist } from './state'

view Header {
  let id
  let lesson = null

  on.props(() => {
    id = view.props.id
    lesson = lessons[id]
  })

  <Logo onClick={() => Flint.router.go('/lessons/0')} />
  <Nav
    prev={() => Flint.router.go('lessons/' + (id - 1))}
    title={state.current.title}
    next={() => Flint.router.go('lessons/' + (id + 1))}
  />

  $ = {
    padding: 10,
    flexShrink: 0,
    background: '#F7F7F7',
    position: 'relative'
  }

  $Nav = {
    position: 'absolute',
    top: 5,
    right: 5
  }
}

view Nav {
  let getLink = () => {
    let url = save(state.current.code)
    window.location = url
  }

  <contain class="gist">
    <title class="piece solo" onClick={getLink}>Share</title>
  </contain>
  <contain>
    <arrow if={!gist && state.lessonID > 0} class="first piece" onClick={view.props.prev}>◀</arrow>
    <title class={{solo:gist, piece:true}}
           onClick={() => gist && Flint.router.go('/lessons/0') }
    >{gist ? 'Examples' : view.props.title}</title>
    <arrow if={!gist && state.lessonID < lessons.length - 1} class="last piece" onClick={view.props.next}>▶</arrow>
  </contain>

  const radius = 5

  $ = { flexFlow: 'row', }
  $contain = {
    flexFlow: 'row',
    color: '#c80032',
    fontWeight: 600,
    borderRadius: radius,
    boxShadow: [0,0,0,0.1],
    cursor: 'pointer'
  }

  $gist = { marginRight: 20, }

  $lesson = { flexFlow: 'row' }

  $piece = {
    padding: [5, 10],
    background: [255,255,255,0.5],

    hover: {
      background: [255,255,255,1]
    }
  }

  $last = {
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  }

  $first = {
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
  }

  $title = {
    border: [1, 'solid'],
    borderColor: [0,0,0,0.1],
    borderTop: 'none',
    borderBottom: 'none'
  }

  $solo = { border: [0, 'solid'] }
}
