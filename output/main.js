import browser from 'flint-babel-core/browser'
import flint from 'flint-transform'

console.log('transform is', browser, 'flint is', flint)
const opts = {
  jsxPragma: 'view.el',
  stage: 2,
  blacklist: ['flow', 'es6.tailCall', 'strict'],
  plugins: [
    flint({
      basePath: '.',
      selectorPrefix: '#_flintapp ',
      writeStyle: function noop(){}
    })
  ]
}

const viewMatcher = /^view\s+([\.A-Za-z_0-9]*)\s*\{/
function safeJSX(source) {
  let inView = false
  let result = source
  .split("\n")
  .map((line, index) => {
    let result = line

    let _view = result.match(viewMatcher)

    if (_view && _view.length) {
      inView = true
    }

    const JSXstart = inView && (
      line.charAt(2) == '<' &&
      line.charAt(3) != '/'
    )

    if (JSXstart)
      result = ';' + result.substr(1)

    if (inView && line.charAt(0) == '}')
      inView = false

    return result
  })
  .join("\n")

  return result
}


const flintTransform = src => transform(safeJSX(src), opts).code

window.addEventListener('message', e => {
  console.log('got', e.data, flintTransform(e.data))
  eval(flintTransform(e.data))
  setTimeout(() => Flint.render())
})
