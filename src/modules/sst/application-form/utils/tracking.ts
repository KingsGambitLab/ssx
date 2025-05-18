/* eslint-disable @typescript-eslint/no-explicit-any */

import tracker from '@lib/tracking';

const formattedErrors = (error: any) => {
  if (typeof error !== 'object') return error;
  
  const formattedErrors: Record<string, string> = {};

  Object.entries(error).forEach(([field, value]: [string, any]) => {
    if (value?.message) {
      formattedErrors[field] = value.message;
    }
  });

  return formattedErrors;
};


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

  const formItem = inputField.closest('.ant-form-item');
  const errorNode = formItem?.querySelector('.ant-form-item-explain-error');

  tracker.click({
    click_type: errorNode ? 'form_input_error' : 'form_input_filled',
    click_text: inputName,
    click_source: formId,
    click_item: inputName,
    click_value: inputValue,
    ...(errorNode && {
      error_message: errorNode.textContent,
    })
  })
}

const observeAntdSelectChanges = (selectWrapper: HTMLElement, formId: string) => {
  const selectionItem = selectWrapper.querySelector('.ant-select-selection-item');

  if (!selectionItem) return;

  const observer = new MutationObserver(() => {
    const fieldName = selectWrapper.getAttribute('data-field-name') || 'select_field';
    const selectedValue = selectWrapper.querySelector('.ant-select-selection-item')?.textContent?.trim() || '';
  
    tracker.click({
      click_type: 'form_select_change',
      click_text: fieldName,
      click_source: formId,
      click_item: fieldName,
      click_value: selectedValue,
    });
  });

  observer.observe(selectionItem, {
    characterData: true,
    childList: true,
    subtree: true,
  });
};

const trackActivity = (clickType: string, clickText: string, formId: string) => {
  tracker.click({
    click_type: clickType,
    click_text: clickText,
    click_source: formId,
  })
}

const trackAllFormFields = (formId: string) => {
  const formEl = document.getElementById(`${formId}`);

  if (!formEl) {
    return;
  }

  // track all input fields
  const inputFields = Array.from(formEl.querySelectorAll('input')).filter(
    (input) => !input.closest('.ant-select')
  ) as HTMLInputElement[];

  inputFields.forEach((inputField) => {
    inputField.addEventListener('click',
      () => trackInputFieldClick(inputField, formId)
    );

    inputField.addEventListener('blur',
      () => trackInputFilledAction(inputField, formId)
    );
  })

  // track all select fields
  const selectFields = Array.from(formEl.querySelectorAll('.ant-select')) as HTMLElement[];

  selectFields.forEach((selectField) => {
    observeAntdSelectChanges(selectField, formId);
  });


  // track submit button
  const submitButton = formEl.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.addEventListener('click',
      () => trackActivity('form_submit', submitButton.textContent || '', formId)
    );
  }
}

const trackFormSubmit = (formId: string, formError?: any) => { 
  tracker.formSubmitStatus({
    message: formError ? 'error' : 'success',
    status: 'submitted',
    form_id: formId,
    ...(formError && {
      error_message: formattedErrors(formError),
    })
  })
}

export {
  trackAllFormFields,
  trackFormSubmit,
}