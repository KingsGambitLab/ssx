/* eslint-disable */

const DEFAULT_CONFIG = {
  isEnabled: true,
  superAttributes: {},
  eventUserAttributes: {},
};

import {
  removeEmptyKeys,
  deepMerge,
} from './utils';

import {
  EVENT_NAMES,
} from '@lib/tracking/constants';

declare global {
  interface Window {
    dataLayer?: any;
  }
}

export default class Tracker {
  _platform: 'web' | 'android' | 'ios';
  _isLoggedIn: boolean;
  _isEnabled: boolean;
  _shouldTrack: boolean;
  _pendingList: Array<{
    event: string;
    attributes: object;
  }>;
  _pushToPendingList: boolean;
  _superAttributes: {
    attributes?: object;
    custom?: object;
  };

  // @ts-expect-error unknown type
  constructor(config) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    this._platform = 'web';
    this._isLoggedIn = false;
    this._isEnabled = Boolean(finalConfig.isEnabled);
    this._shouldTrack = true;
    this._superAttributes = finalConfig.attributes || {};
    this._pendingList = [];
    this._pushToPendingList = false;

    this._initialiseDataLayer();
    // this._enhancePublicMethods();
  }

  _isWindowUndefined() {
    return typeof window === 'undefined';
  }

  _initialiseDataLayer() {
    if (this._isWindowUndefined()) return;

    window.dataLayer ||= [];
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get shouldTrack() {
    return this._shouldTrack;
  }

  get superAttributes() {
    return this._superAttributes;
  }

  set superAttributes(attributes) {
    this._superAttributes = deepMerge(this.superAttributes, attributes);
  }

  set isLoggedIn(status: boolean) {
    this._isLoggedIn = status;
  }

  set pushtoPendingList(shouldPush: boolean) {
    this._pushToPendingList = shouldPush;

    if (!shouldPush) {
      this._pushPendingEvents();
    }
  }

  _pushPendingEvents() {
    if (this._pendingList.length) {
      this._pendingList.forEach(({
        event, attributes
      }) => this._trackEvent(event, attributes));
      this._pendingList = [];
    }
  }

  _createEventPayload(event: string, _attributes: {
    custom?: object,
  }) {
    const { custom: customAttributes, ...attributes } = _attributes;
    const {
      custom: customSuperAttributes = {},
      attributes: superAttributes = {},
    } = this.superAttributes;

    return {
      event,
      attributes: {
        is_logged_in: this._isLoggedIn,
        ...superAttributes,
        ...attributes,
      },
      // user_attributes: this._eventUserAttributes,
      custom_attributes: {
        ...customSuperAttributes,
        ...customAttributes,
      },
    };
  }

  _pushToDataLayer(payload: object) {
    window.dataLayer.push({
      _clear: true,
      ...payload,
    });
  }

  _logEvent(payload: {
    event: string,
  }) {
    console.info(
      `"${payload.event}" event has been received with below payload: `,
      payload,
    );
  }

  _trackEvent(event: string, _attributes: {
    custom?: object,
  }) {
    if (!this.isEnabled) return;
    if (this._pushToPendingList) {
      this._pendingList.push({
        event,
        attributes: _attributes
      });
      return;
    }

    const attributes = removeEmptyKeys(_attributes);
    // if (!areAttributesValid(event, attributes)) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventPayload = this._createEventPayload(event, attributes);

    if (this.shouldTrack) {
      this._pushToDataLayer(eventPayload);
    } else {
      this._logEvent(eventPayload);
    }
  }

  _createPageViewAttributes(attributes: object): object {
    const { title } = window.document;
    // @ts-expect-error unknown type
    const url = new URL(window.location);

    return {
      page_title: title,
      page_path: url.pathname,
      page_url: url.href,
      query_params: Object.fromEntries(url.searchParams),
      ...attributes,
    };
  }

  pushRawEvent(event: object) {
    this._pushToDataLayer(event);
  }

  click(attributes: object) {
    this._trackEvent(EVENT_NAMES.CLICK, attributes);
  }

  pageview(attributes = {}) {
    const finalAttributes = this._createPageViewAttributes(attributes);
    this._trackEvent(EVENT_NAMES.PAGE_VIEW, finalAttributes);
  }

  hover(attributes: object) {
    this._trackEvent(EVENT_NAMES.HOVER, attributes);
  }

  sectionView(attributes: object) {
    this._trackEvent(EVENT_NAMES.SECTION_VIEW, attributes);
  }

  formSubmitStatus(attributes: object) {
    this._trackEvent(EVENT_NAMES.FORM_SUBMIT_STATUS, attributes);
  }

  logout(attributes = {}) {
    this._trackEvent(EVENT_NAMES.LOGOUT, attributes);
  }
}
