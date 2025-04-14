import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/sst/waitlist/components/types';

export const trackingSources = {
  waitlistLoginMobileForm: 'waitlist-login-mobile-form',
  waitlistModal: 'waitlist-modal',
  waitlistOTPModal: 'waitlist-otp-modal',
  waitlistLoginOTPForm: 'waitlist-login-otp-form',
  waitlistForm: 'waitlist-form',
}

export const trackingEvents = {
  waitlistFormView: 'waitlist-form-view',
  formInputFocus: 'form-input-focus',
  formInputFilled: 'form-input-filled',
  waitlistLoginMobileFormSubmit: 'waitlist-login-mobile-form-submit',
  waitlistModalClose: 'waitlist-modal-close',
  wrongPhoneNumber: 'wrong-phone-number',
  resendOTP: 'resend-otp',
  otpFormSubmit: 'otp-form-submit',
  phoneEmailFormSubmitButton: 'phone-email-form-submit-button',
  waitlistCategoryChange: 'waitlist-category-change',
  turnstileModalClose: 'turnstile-modal-close',
  turnstileModalSubmit: 'turnstile-modal-submit',
}

export const trackEvent = {
  click: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.click({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  },
  view: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.view({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  },
  formSubmitStatus: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.formSubmitStatus({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  }
}