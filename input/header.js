import lessons from './lessons'

view Header {
  let id
  let lesson = null

  on.props(() => {
    id = view.props.id
    lesson = lessons[id]
  })

  <Logo />
  <Nav
    prev={() => Flint.router.go('lesson/' + (id - 1))}
    title={lesson.title}
    next={() => Flint.router.go('lesson/' + (id + 1))}
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
  <arrow class="first piece" onClick={view.props.prev}>◀</arrow>
  <title class="piece">{view.props.title}</title>
  <arrow class="last piece" onClick={view.props.next}>▶</arrow>

  const radius = 5

  $ = {
    flexFlow: 'row',
    color: '#c80032',
    fontWeight: 600,
    borderRadius: radius,
    boxShadow: [0,0,0,0.1],
    cursor: 'pointer'
  }

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
}
