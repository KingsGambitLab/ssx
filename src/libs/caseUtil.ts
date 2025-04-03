import {
  camelCase,
  kebabCase,
  lowerCase,
  snakeCase,
  startCase
} from 'lodash';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';
import upperCase from 'lodash/upperCase';

/**
 * Utility Library for converting from one case to another.
 * Supported cases are accessible as static methods but only
 * for string data-types
 *
 * For objects ({}, [], Sets) use toCase method.property
 *
 * Example:
 *  CaseUtil.toCase('snakeCase', { 'camelCase': 3 })
 *  -> {camel_case: 3}
 *
 */
export default class CaseUtil {
  /**
   * Converts source to camelCase
   *
   * @param {String} str : source string
   */
  static camelCase(str: string) {
    return camelCase(str);
  }

  /**
   * Converts source to CONSTANT_CASE
   *
   * @param {String} str : source string
   */
  static constantCase(str: string) {
    return upperCase(str).replace(/ /g, '_');
  }

  /**
   * Converts source to kebab-case
   *
   * @param {String} str : source string
   */
  static kebabCase(str: string) {
    return kebabCase(str);
  }

  /**
   * Converts source to lowercase
   *
   * @param {String} str : source string
   */
  static lowerCase(str: string) {
    return lowerCase(str).replace(/ /g, '');
  }

  /**
   * Converts source to snake_case
   *
   * @param {String} str : source string
   */
  static snakeCase(str: string) {
    return snakeCase(str);
  }

  /**
   * Converts source to "Title Case"
   *
   * @param {String} str : source string
   */
  static titleCase(str: string) {
    return startCase(camelCase(str));
  }

  /**
   * Checks if the given case is supported by CaseUtil
   *
   * @static
   * @param {string} tCase
   * @returns string
   * @memberof CaseUtil
   */
  static isSupportedCase(tCase: string) {
    return Object.prototype.hasOwnProperty.call(CaseUtil, tCase);
  }

  /**
  * Converts object to specific case
  *
  * @static
  * @param {string} tCase
  * @param {object | function | array | string | any} tObj
  * @returns any
  * @memberof CaseUtil
  */
  static toCase(tCase: string, tObj: object | string | unknown) {
    if (!tCase || !this.isSupportedCase) {
      throw new TypeError(`Invalid target case: ${tCase}`);
    }

    const tFun = this[tCase as keyof typeof CaseUtil];
    if (!isObject(tObj)) {
      return (tFun as (str: string) => string)(tObj as string);
    }

    const convert = (o: unknown): unknown => {
      if (isPlainObject(o)) {
        const n: Record<string, unknown> = {};

        Object.keys(o as object).forEach((key) => { n[(tFun as (str: string) => string)(key)] = convert((o as Record<string, unknown>)[key]); });

        return n;
      } else if (isArray(o)) {
        return o.map((elem) => convert(elem));
      }

      return o;
    };

    return convert(tObj);
  }

}
