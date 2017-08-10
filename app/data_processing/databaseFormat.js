// const correctKeys = ['school', 'sex', 'age', 'address', 'famsize', 'Pstatus', 'Medu', 'Fedu',
//   'Mjob', 'Fjob', 'reason', 'guardian', 'traveltime', 'studytime', 'failures', 'schoolsup', 'famsup',
//   'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic', 'famrel', 'freetime', 'goout',
//   'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2', 'G3'];

/* Mindset: Everything is going to be stored as strings. 
We just need to check to see if we need to conver them to Numbers. */


// the value just needs to not be 'null'
const formatNumberTable = { age: 1,
  Medu: 1,
  Fedu: 1,
  traveltime: 1,
  studytime: 1,
  failures: 1,
  famrel: 1,
  freetime: 1,
  goout: 1,
  Dalc: 1,
  Walc: 1,
  health: 1,
  absences: 1,
  G1: 1,
  G2: 1,
  G3: 1 };


const dbFormatter = {
  format: (key, value) => {
    // let formattedValue = null;
    let formattedValue = null;
    // TODO: perhaps remove this double check
    if (formatNumberTable[key] != null) {
      formattedValue = parseInt(value, 10); // radix 10 (decimal)
    }
    return formattedValue;
  },

  // we don't want to waste time formatting keys we don't need to format
  keysToFormat: () => Object.keys(formatNumberTable),
};
module.exports = dbFormatter;
