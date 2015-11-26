import { transform } from 'flint-babel-core/browser'
import flint from 'flint-transform'

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

const flintTransform = src => transform(src, opts).code

eval(flintTransform(`view Main{
  <h1>hello</h1>
  ; <Child />
}`))

window.addEventListener('message', e => {
  console.log('got', e.data, flintTransform(e.data))
  eval(flintTransform(e.data))
  setTimeout(() => Flint.render())
})