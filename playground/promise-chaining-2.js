require('../src/db/mongoose');
const Task = require('../src/models/task');
/*
Task.findByIdAndDelete('636cbba06fbd380effb79b83')
  .then(task => {
    // לא באמת חייבים לעשות משהו עם התוצאה אבל בחר להדפיס בקונסול
    console.log(task);
    return Task.countDocuments({ completed: false }); //בכדי להראות דוגמא לשרשור פרומיס אז הוא בחר להחזיר פרומיס,שאינו קשור לפרומיס הקודם,סס
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
*/
//11-15 96. Async/Await: Part II
const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount('636a82591409367469ebdc8c')
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
