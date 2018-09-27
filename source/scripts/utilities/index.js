export default {
  formatBRLDec(amount) {
    let formated = `${amount}`;
    formated = formated.replace(/([0-9]{2})$/g, ',$1');

    if (formated.length > 6) {
      formated = formated.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }

    return formated;
  },

  thousandsSeparator(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  formatBRL(amount) {
    return String(amount).substring(0, String(amount).length - 2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },

  cleanPhone(phone) {
    return `+55${phone
      .trim()
      .replace(/\W+/g, '')
      .replace(/\D+/g, '')}`;
  },

  removeAccented(value) {
    let newString = value.toLowerCase();
    const mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g,
    };
    const keys = Object.keys(mapaAcentosHex);

    keys.map((item) => {
      const expressaoRegular = mapaAcentosHex[item];
      newString = newString.replace(expressaoRegular, item);
    });

    return newString;
  },

  formatCNPJ(value) {
    return String(value).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  },

  formatCPF(value) {
    return String(value).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
  },

  titleCase(str) {
    return str
      .split(/\s+/)
      .map((item) => {
        if (item.length > 2) {
          return /d(?:os*)|(?:as*)|e/.test(item.toLowerCase())
            ? item.toLowerCase()
            : item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
        }
        return item.toLowerCase();
      })
      .join(' ');
  },
};
