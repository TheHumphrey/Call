import React from "react";

import { Editor } from "lib/components/Editor/Editor";
import { Select, EditorContainer, SelectContainer, Container } from "./style";

interface Props {
  templatesOptions: any,
  selectedDocumentTemplate: any,
  setSelectedDocumentTemplate: any,
  changeEditorState: any,
  handleSave: any,
}

export const DocViewer = ({
  templatesOptions,
  selectedDocumentTemplate,
  setSelectedDocumentTemplate,
  changeEditorState,
  handleSave,
}: Props) => {
  return (
    <Container>
      <SelectContainer>
        {templatesOptions?.length > 0 && (
          <Select
            placeholder="Modelo de documento"
            options={templatesOptions}
            value={selectedDocumentTemplate ? selectedDocumentTemplate : ""}
            onChange={(event: any) => setSelectedDocumentTemplate(event)}
          />
        )}
      </SelectContainer>

      <EditorContainer>
        {selectedDocumentTemplate && (
          <Editor
            data={selectedDocumentTemplate?.data}
            title="Edite o arquivo no espaço abaixo"
            changeState={changeEditorState}
            saveCallback={() => handleSave()}
            saveTopButton={true}
          />
        )}
      </EditorContainer>
    </Container>
  );
}
