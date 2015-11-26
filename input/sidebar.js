import lessons from './lessons'

view Sidebar {
  let show = true

  <Hover onChange={val => show = val}>
    <bar>
      <Link repeat={lessons} to={`/lesson/${_index}`}>
        {_.title}
      </Link>
    </bar>
  </Hover>

  $ = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: show ? 200 : 20,
    zIndex: 1000
  }

  $bar = [{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 200,
    flexGrow: 1,
    background: '#fff',
    boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
    borderRadius: 3,
    transition: 'all ease-in 200ms',
    padding: 10,
    alignItems: 'center',
    opacity: 1,
    transform: { y: 0 },

  }, !show && {
    opacity: 0,

    transform: {
      x: 10
    }
  }]
}
