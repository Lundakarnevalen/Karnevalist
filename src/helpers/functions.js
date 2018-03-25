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
  fields.forEach(field => {
    strings[field] = COMPONENT_STRINGS[field][language];
  });
  return strings;
}

// takes the form field value and returns true on valid number
function valid_credit_card(value) {
  //   // accept only digits, dashes or spaces
  //   if (/[^0-9-\s]+/.test(value)) return false;
  //
  //   // The Luhn Algorithm. It's so pretty.
  //   let nCheck = 0,
  //     nDigit = 0,
  //     bEven = false;
  //   value = value.replace(/\D/g, '');
  //
  //   for (let n = value.length - 1; n >= 0; n--) {
  //     var cDigit = value.charAt(n),
  //       nDigit = parseInt(cDigit, 10);
  //
  //     if (bEven) {
  //       if ((nDigit *= 2) > 9) nDigit -= 9;
  //     }
  //
  //     nCheck += nDigit;
  //     bEven = !bEven;
  //   }
  //
  //   return nCheck % 10 == 0;
}
