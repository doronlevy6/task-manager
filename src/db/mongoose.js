const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL);

// פרמטר שהמרצה הוסיף בכדי למנוע שגיאות מפאת דפריקשיין, אצלי זה גרסת מונגוס חדשה ואין כרגע תקלות
// useFindAndModify: false

// מונגוס עושה ששם הדוקיומנט יהיה כמו הפרמטר הראשון בתוספת :אס של רבים
// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true, // מבטל רווחים מיותרים
//     lowercase: true, // הופך את הערך לאותיות קטנות
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email is invalid');
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password cannot contain "password"');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be a postive number');
//       }
//     },
//   },
// });
// // יצירת מופע של המודל
// const me = new User({
//   name: '   forOn  ',
//   email: 'MYEMAIL@MEAD.IO   ',
//   password: 'phone098!',
// });

// // הפרמטר שדן מקבל זה מי ולכן לא חייבים לשים אותו
// // me.save()
// //   .then(() => {
// //     console.log(me);
// //   })
// //   .catch(error => {
// //     console.log('Error!', error);
// //   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const task = new Task({
//   description: '  Eat lunch',
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(error => {
//     console.log(error);
//   });
