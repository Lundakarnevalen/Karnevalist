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

export function isEmail(toTest) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    toTest
  );
}

export function containsOnlyLetters(toTest) {
  return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
    toTest
  );
}

export function isValidPhoneNbr(toTest) {
  return /^\+?\d+$/.test(toTest) && toTest.length >= 7 && toTest.length <= 20;
}

export function containsOnlyDigits(text) {
  return /^\d+$/.test(text);
}

export function getStrings(language, COMPONENT_STRINGS) {
  const strings = {};
  Object.keys(COMPONENT_STRINGS).forEach(
    field => (strings[field] = COMPONENT_STRINGS[field][language])
  );
  return strings;
}
