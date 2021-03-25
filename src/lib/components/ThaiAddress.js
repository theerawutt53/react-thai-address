import DB from './db.json'

var database = [];
var provinces = [];
/*
{
  tumbon:"คลองท่อม",
  city:"คลองท่อมเหนือ",
  province:"กระบี่",
  zipcode:81120
}
*/
const preprocess = () => {
  var data = DB;
  var lookup = [],
    words = [],
    expanded = [],
    t;
  if (data.lookup && data.words) {
    lookup = data.lookup.split('|');
    words = data.words.split('|');
    data = data.data;
  }
  t = function (text) {
    function repl(m) {
      var ch = m.charCodeAt(0);
      return words[ch < 97 ? ch - 65 : 26 + ch - 97];
    }
    if (typeof text === 'number') {
      text = lookup[text];
    }
    return text.replace(/[A-Z]/ig, repl);
  };
  data.forEach(function (_provinces) {
    var i = 1;
    if (_provinces.length === 3) {
      i = 2;
    }
    _provinces[i].forEach(function (amphoes) {
      amphoes[i].forEach(function (districts) {
        districts[i] = districts[i] instanceof Array ? districts[i] : [districts[i]];
        districts[i].forEach(function (zipcode) {
          var entry = {
            tumbon: t(districts[0]),
            city: t(amphoes[0]),
            province: t(_provinces[0]),
            zipcode: zipcode
          };
          if (i === 2) {
            entry.tumbon_code = districts[1] || false;
            entry.city_code = amphoes[1] || false;
            entry.province_code = _provinces[1] || false;
          }
          if (provinces.indexOf(entry.province) === -1) provinces.push(entry.province);
          expanded.push(entry);
        });
      });
    });
  });
  database = expanded;
}

const search = (obj, limit) => {
  if (!obj) return [];
  if (Object.keys(obj).length === 0 && obj.constructor === Object) return [];
  if (database.length === 0) preprocess();
  var _key = Object.keys(obj)[0];
  return database.filter(x => x[_key].toString().startsWith(obj[_key])).slice(0, limit);
}

export default { search, provinces }