import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';

export default function removeEmptyKeys(data: object) {
  return pickBy(
    data,
    (v) => !isNull(v) && !isUndefined(v),
  );
}
