view Hover {
  let show = true
  let showDelay

  on.delay(1000, () => {
    show = false
    view.props.onChange(show)
  })

  function doShow() {
    showDelay = on.delay(300, () => {
     show = true
     view.props.onChange(show)
    })
  }

  function doHide() {
    showDelay()
    show = false
    view.props.onChange(show)
  }

  <hover onMouseEnter={doShow} onMouseLeave={doHide}>
    {view.props.children}
  </hover>
}