const LOOP = 1000

view Main {
  <Game>
    <Road />
    <Cars />
  </Game>
}

view Game {
  let tick = 0

  on.frame(() => {
    tick = tick + 1 % LOOP
  })

  <game repeat={view.props.children}>
    {view.clone(_, { tick })}
  </game>
}

view Road {
  $ = {
    background: 'grey',
    width: '100%',
    height: 700
  }
}

view Cars {
  let cars = [0,1,2]

  <Car repeat={cars} />

  $Car = {
    left: _index * 100 - view.props.tick,
    position: 'absolute'
  }
}

view Car {
  $ = {
    width: 50,
    height: 50,
    background: 'red'
  }
}