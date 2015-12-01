view PrizeBar {
  let show = true

  <Hover onChange={val => show = val}>
    <bar>
      <Logo />
      <Links />
      <ExampleLinks />
    </bar>
  </Hover>

  $ = {
    position: 'fixed',
    top: 0,
    left: '10%',
    right: '10%',
    zIndex: 1000,
  }

  $bar = [{
    flexGrow: 1,
    flexFlow: 'row',
    background: '#fff',
    boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
    borderRadius: 3,
    transition: 'all ease-in 200ms',
    marginTop: 20,
    padding: 10,
    height: 50,
    alignItems: 'center',
    opacity: 1,
    transform: { y: 0 },

  }, !show && {
    opacity: 0,

    transform: {
      y: -100
    }
  }]
}

view Links {
  <Link to="http://flintjs.com">Back to Flint.com</Link>
}

view ExampleLinks {
}