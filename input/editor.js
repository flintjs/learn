import CodeMirror from 'codemirror'
import ReactCodeMirror from 'react-codemirror'

window.CodeMirror = CodeMirror

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldcode'

view Editor {
  let code = ''

  <ReactCodeMirror
    value={code}
    options={{
      mode: "jsx",
      theme: "3024-day",
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      undoDepth: 1000,
      autofocus: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      autoCloseTags: true,
      foldCode: true,
      javascriptHint: true
    }}
    onChange={val => {
      console.log('changed', val)
      code = val
      view.props.onChange(val)
    }}
  />

  $ = {
    flexGrow: 1
  }

  $CodeMirror = {
    border: [1, 'solid', '#ddd'],
  }
}

CodeMirror.defineMode("jsx", function(config, parserConfig) {
  var jsMode = CodeMirror.getMode(config, "javascript");
  var xmlMode =  CodeMirror.getMode(config, {name: "xml", htmlMode: true});

  function js(stream, state) {
    if ((state.jsState.lastType == "operator"
         || state.jsState.lastType == "keyword c"
         || state.jsState.lastType == "=>"
         || /^[\[{}\(,;:]$/.test(state.jsState.lastType))
        && stream.match(/^<[a-zA-Z]+/i, false)) {
      state.token = xml;
      return xmlMode.token(stream, state.localState);
      state.localState = xmlMode.startState(jsMode.indent(state.jsState, ""));
      state.localMode = xmlMode;
      state.indented = stream.backUp(1);
      return xml(stream, state);
    }
    return jsMode.token(stream, state.jsState);;
  }

  function xml(stream, state) {
    var oldContext = state.localState.context
    var style = xmlMode.token(stream, state.localState);
    if(oldContext && !state.localState.context){
      state.token = js;
      return jsMode.token(stream, state.jsState);
    }
    return style
  }

  return {
    startState: function() {
      var state = jsMode.startState();
      var xmlState = xmlMode.startState();
      return {token: js, localState: xmlState, jsState: state};
    },

    copyState: function(state) {
      return {token: state.token,
              localState: CodeMirror.copyState(xmlMode, state.localState),
              jsState: CodeMirror.copyState(jsMode, state.jsState)};
    },

    token: function(stream, state) {
      return state.token(stream, state);
    },

    indent: function(state, textAfter) {
      if (state.token == js)
        return jsMode.indent(state.jsState, textAfter);
      else
        return xmlMode.indent(state.localState, textAfter);
    },
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    lineComment: "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",
    electricChars: "/{}:"
  };
});