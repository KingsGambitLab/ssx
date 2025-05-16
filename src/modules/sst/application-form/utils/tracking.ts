import tracker from '@lib/tracking';

const trackInputFieldClick = (inputField: HTMLInputElement, formId: string) => {
  const inputName = inputField.name;
  const inputValue = inputField.value;

  tracker.click({
    click_type: 'form_input_click',
    click_text: inputName,
    click_source: formId,
    click_item: inputName,
    click_value: inputValue,
  })
}

const trackInputFilledAction = (inputField: HTMLInputElement, formId: string) => {
  const inputName = inputField.name;
  const inputValue = inputField.value;

  tracker.click({
    click_type: 'form_input_filled',
    click_text: inputName,
    click_source: formId,
    click_item: inputName,
    click_value: inputValue,
  })
}

const trackAllFormFields = (formId: string) => {
  const formEl = document.getElementById(`${formId}`);

  if (!formEl) {
    return;
  }

  // select all input fields
  const inputFields = formEl.querySelectorAll('input');

  inputFields.forEach((inputField) => {
    inputField.addEventListener('click',
      () => trackInputFieldClick(inputField, formId)
    );

    inputField.addEventListener('blur',
      () => trackInputFilledAction(inputField, formId)
    );
  })
}

export {
  trackAllFormFields
}