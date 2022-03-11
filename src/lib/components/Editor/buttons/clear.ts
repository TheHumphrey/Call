// @ts-ignore
import FroalaEditor from 'froala-editor';

function registerClearButton() {
  FroalaEditor.DefineIcon('clear', { NAME: 'remove', SVG_KEY: 'remove' });
  FroalaEditor.RegisterCommand('clear', {
    title: 'Clear HTML',
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.set('');
      this.events.focus();
    }
  });
}

export default registerClearButton;