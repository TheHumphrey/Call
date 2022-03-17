import { Editor } from "lib/components/Editor/Editor";
import {
  Select,
  EditorContainer,
  SelectContainer,
  Container,
  NotFoundDocument,
} from "./style";
import { TDocumentTemplate } from "types";

interface Props {
  templatesOptions: any,
  selectedDocumentTemplate: TDocumentTemplate,
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
  const isRender = templatesOptions?.length > 0
  return (
    <Container>
      <SelectContainer>
        {isRender && (
          <Select
            placeholder="Modelo de documento"
            options={templatesOptions}
            value={selectedDocumentTemplate}
            onChange={(event: any) => setSelectedDocumentTemplate(event)}
          />
        )}
      </SelectContainer>

      <EditorContainer isNotFound={!isRender}>
        {isRender && selectedDocumentTemplate && (
          <Editor
            data={selectedDocumentTemplate?.data || ""}
            title="Edite o arquivo no espaço abaixo"
            changeState={changeEditorState}
            saveCallback={() => handleSave()}
            saveTopButton={true}
          />
        )}
        {!isRender && (<>
          <NotFoundDocument>Não existe nenhum modelo cadastrado pare esse documento.</NotFoundDocument>
        </>)}
      </EditorContainer>
    </Container>
  );
}
