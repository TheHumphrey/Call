// @ts-ignore
import FroalaEditor from 'froala-editor';

function registerInputButton() {
  FroalaEditor.DefineIcon('input', { NAME: 'input', SVG_KEY: 'add' })
  FroalaEditor.RegisterCommand('input', {
    title: 'Insert Input',
    focus: false,
    undo: false,
    refreshAfterCallBack: true,
    callback: function (content: any) {
      this.html.insert(`<input>${content}</input>`)
    }
  })
}
export default registerInputButton;