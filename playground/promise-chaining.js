////https://mongoosejs.com/docs/queries.html
// https://mongoosejs.com/docs/api/model.html
require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('636ce38b71232e708a6d36a1', { age: 2 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });
///////////////////
//11-15 96. Async/Await: Part II
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount('636cb7263040fd7b6116fc73', 3)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
