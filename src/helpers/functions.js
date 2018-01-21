export function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export function stripHtmlString(string) {
  return string
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/(&#8211;)/gi, '-')
    .replace(/(&nbsp;)/gi, '')
    .replace(/(&#8230;)/gi, '...');
}
