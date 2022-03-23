import "froala-editor/css/froala_editor.pkgd.min.css"
import "froala-editor/css/froala_style.css"
import "froala-editor/js/plugins.pkgd.min.js"

import { EditorContainer, EditorHeaderContainer, EditorWrapper, SaveButton } from "./style"
import FroalaEditorComponent from "react-froala-wysiwyg"
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"

import { useEffect, useState } from "react"
import registerSaveButton from "./buttons/save"
import defaultButtonsFactory from "./buttonFactories/defaultButtonsFactory"
interface Props {
  data: string,
  title?: any,
  saveCallback?: any,
  saveTopButton?: boolean,
  viewOnly?: boolean,
  documentReady?: boolean
  withoutBorder?: any,
  changeState?: any
}

export const Editor = (props: Props) => {

  const { withoutBorder, data, viewOnly, documentReady, title, saveCallback, saveTopButton, changeState } = props

  const [html, setHtml] = useState(data)

  useEffect(() => {
    setHtml(data)
  }, [data])

  function handleChange(event: any) {
    setHtml(event)
    changeState(event)
  }

  function handleConfig() {
    const config = {
      key: "Ig1A7vA5C2C2B1B1H4mEZXQUVJe1EZb1IWIAUKLJZMBQuF2C1G1I1A10C1C6A1A5G4==", //process.env.FROALA_KEY,
      attribution: false,
      toolbarButtons: [
        [
          "undo",
          "redo",
          "fontFamily",
          "fontSize",
          "font",
          "textColor",
          "backgroundColor",
          "bold",
          "italic",
          "underline",
          "align",
          "indent",
          "print",
          "html",
          "input"
        ],
      ],
      fontFamilySelection: true,
      fontSizeSelection: true,
      paragraphFormatSelection: true,
      toolbarBottom: true,
      documentReady: documentReady,
      toolbarSticky: false,
    }


    if (!saveTopButton) {
      config.toolbarButtons.push(["save"])
    }

    return config
  }

  useEffect(() => {
    defaultButtonsFactory()
  }, [])

  useEffect(() => {
    registerSaveButton(saveCallback)
  })

  return (
    <EditorContainer>
      <EditorWrapper withoutBorder={withoutBorder}>
        <EditorHeaderContainer>
          {title}
          {saveTopButton && <SaveButton onClick={() => saveCallback()}>Salvar</SaveButton>}
        </EditorHeaderContainer>

        {!viewOnly && (
          <FroalaEditorComponent
            config={handleConfig()}
            model={html}
            onModelChange={(event: any) => handleChange(event)}
            tag="textarea"
          />
        )}

        {viewOnly && <FroalaEditorView model={html} />}
      </EditorWrapper>
    </EditorContainer>
  )
}
