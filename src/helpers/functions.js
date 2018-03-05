export function dynamicSort(property, language = null) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    let result;
    if (language === null)
      result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    else
      result =
        a[property][language] < b[property][language]
          ? -1
          : a[property][language] > b[property][language] ? 1 : 0;
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

export function getStrings(language, COMPONENT_STRINGS) {
  const { fields } = COMPONENT_STRINGS;
  const strings = {};
  fields.forEach(
    field => (strings[field] = COMPONENT_STRINGS[field][language])
  );
  return strings;
}
