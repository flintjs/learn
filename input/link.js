view Link {
  <link-a yield onClick={Flint.router.link(view.props.to)} />

  $link = {
    fontSize: 16,
    color: '#333',
    padding: [8],
    alignSelf: 'stretch',

    hover: {
      background: 'rgba(0,0,0,0.05)'
    }
  }
}
