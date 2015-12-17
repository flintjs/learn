let remote = 'http://gist.flintjs.com?source='
let local = window.location.origin + '/'
let prefix = (window.location.hostname == 'localhost' ? local : remote) + '?src='

export default {
  save(source) {
    return encodeURI(prefix + source)
  },
  getSource(url) {
    return decodeURI(prefix + source).split(prefix)[1]
  },
}
