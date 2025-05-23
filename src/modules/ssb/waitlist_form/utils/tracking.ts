import { tracker } from "@lib";

import { TrackingProps } from "@modules/ssb/waitlist_form/types";

export const trackingSources = {
  waitlistLoginMobileForm: 'waitlist-login-mobile-form',
  waitlistOTPModal: 'waitlist-otp-modal',
  waitlistLoginOTPForm: 'waitlist-login-otp-form',
  waitlistForm: 'waitlist-form',
}

export const trackingEvents = {
  waitlistFormView: 'waitlist-form-view',
  formInputFocus: 'form-input-focus',
  formInputFilled: 'form-input-filled',
  waitlistLoginMobileFormSubmit: 'waitlist-login-mobile-form-submit',
  wrongPhoneNumber: 'wrong-phone-number',
  resendOTP: 'resend-otp',
  otpFormSubmit: 'otp-form-submit',
  phoneEmailFormSubmitButton: 'phone-email-form-submit-button',
  turnstileModalClose: 'turnstile-modal-close',
  turnstileModalSubmit: 'turnstile-modal-submit',
  waitlistFormSubmit: 'waitlist-form-submit',
}

export const trackEvent = {
  click: ({ clickType, clickText, clickSource, formType, custom }: TrackingProps) => {
    tracker.click({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      form_type: formType,
      custom: custom,
    });
  },
  sectionView: ({ sectionName }: { sectionName: string }) => {
    tracker.sectionView({
      section_name: sectionName,
    });
  },
  formSubmitStatus: ({ attributes, extraInfo }: {
    attributes: object;
    extraInfo: object;
  }) => {
    tracker.formSubmitStatus({
      ...attributes,
      extra_info: extraInfo,
    });
  }
}