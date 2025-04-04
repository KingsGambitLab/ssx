import {
  getDeviceType,
} from '@lib/platformHelper';
import {
  getProduct,
} from './utils';

export default class Attribution {
  _platform: 'tablet' | 'mobile' | 'desktop';
  _product: string;
  _attribution: {
    intent: string;
    platform: string;
    product: string;
    program: string | null;
    experiment: string;
  }
  _experiment: string;

  constructor() {
    this._platform = 'mobile';
    this._product = 'homepage';
    this._experiment = '';
    this._attribution = {
      platform: this._platform,
      product: this._product,
      intent: '',
      program: null,
      experiment: this._experiment,
    };
  }

  get platform() {
    return this._platform;
  }

  get product() {
    return this._product;
  }

  get attribution() {
    return this._attribution;
  }

  set attribution(attributes) {
    this._attribution = {
      ...attributes,
      platform: this._platform,
      product: this._product,
      experiment: this._experiment,
    };
  }

  get experiment() {
    return this._experiment;
  }

  set experiment(experiment: string) {
    this._experiment = experiment;
  }

  setPlatform() {
    this._platform = getDeviceType();
  }

  setProduct() {
    this._product = getProduct(window.location.href);
  }

  getAttribution() {
    return this.attribution;
  }

  setAttribution(intent: string, {
    program = null,
    ...data
  }: {
    program?: string | null;
  } = {}) {
    // @ts-expect-error - data object structure is dynamic and cannot be statically typed
    this.attribution = {
      intent,
      program,
      ...data,
    };
  }
}
