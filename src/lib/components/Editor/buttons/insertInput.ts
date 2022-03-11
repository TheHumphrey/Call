// @ts-ignore
import FroalaEditor from 'froala-editor';

function registerInsertInput() {
  FroalaEditor.DefineIcon('insert', { NAME: 'plus', SVG_KEY: 'add' });
  FroalaEditor.RegisterCommand('insert', {
    title: 'Insert INPUT',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.insert('<input placeholder="test"></input>');
    }
  });
}

export default registerInsertInput;