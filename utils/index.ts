export function getPriceFromText(labelText: string | null) {
    if(labelText) {
        const match = labelText.match(/\[\+(\d+(\.\d{2})?)\]/);
        if(match) {
          return  parseFloat(match[1]);
        }
    }
    return 0;
}

export function getObjectKeyFromClassName( className: string) {
  let objectKey = className;
  objectKey = objectKey
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');

  objectKey = objectKey.charAt(0).toLowerCase() + objectKey.slice(1);
  return objectKey;
}

export function getCorrectedStateZipCode(stateZipCode: string) {
  return stateZipCode.split(' ').filter(word => word && word).join(" ").replace(',\n', ',');
}