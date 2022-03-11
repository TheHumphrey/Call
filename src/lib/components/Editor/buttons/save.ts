// @ts-ignore
import FroalaEditor from 'froala-editor';

function registerSaveButton(callbackToSave: any) {
  FroalaEditor.DefineIcon('save', { NAME: 'Salvar', template: 'text' });
  FroalaEditor.RegisterCommand('save', {
    title: 'Salvar',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: callbackToSave
  });
}

export default registerSaveButton;