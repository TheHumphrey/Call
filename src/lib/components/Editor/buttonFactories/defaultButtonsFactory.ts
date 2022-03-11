import registerClearButton from "../buttons/clear";
import registerInsertInput from "../buttons/insertInput";
import registerInputButton from "../buttons/input";

function defaultButtonsFactory() {
    registerClearButton();
    registerInsertInput()
    registerInputButton();
}

export default defaultButtonsFactory;
