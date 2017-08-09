// const correctKeys = ['school', 'sex', 'age', 'address', 'famsize', 'Pstatus', 'Medu', 'Fedu',
//   'Mjob', 'Fjob', 'reason', 'guardian', 'traveltime', 'studytime', 'failures', 'schoolsup', 'famsup',
//   'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic', 'famrel', 'freetime', 'goout',
//   'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2', 'G3'];

/* Mindset: Everything is going to be stored as strings. 
We just need to check to see if we need to conver them to Numbers. */


const formatNumberTable = [{ 'G3': new Number() }];
const dbFormatter = {
  format: (key, object) => {
    //let formattedValue = null;

    if (formatNumberTable[key] != null) {
      object[key] = parseInt(object[key], 10); // radix 10 (decimal)
    } 
    return object;


    // const correctDataType = typeof formatTable[key];
    // if (typeof value !== correctDataType) {
    // // need to format
    //   if (typeof correctDataType === 'number') {
    //     formattedValue = parseInt(value, 10); // radix 10 (decimal)
    //   } else {
    //     console.log('HUGE DATA PROBLEM');
    //   }
    //   return formattedValue;
    // }
    // dont need to format, correct already
  },
};
module.exports = dbFormatter;
