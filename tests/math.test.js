//npm jest@23.6.0
//כמו כן להסתכל  בקובץ הפקג''
//"test": "jest --watch" מריץ כל שינוי
//ההרצה-npm test  אפשר גם מהתיקייה החיצונית טאסק מאנג'ר
//https://jestjs.io/docs/cli -אופציות בקומנד ליין מצד ימין במסך
// כמו כן הגדרנו בקונפיגורשיין בקובץ חדש דטאבייס אחר שעליו נעשה טסטים אחרת הוא ישנה לנו את הדטאבייס המקורי
// ועקב כך שיננו הגדרה בפקאג
//לינק  להגדרות לקונפיגציות סביבת הטסט
// https://jestjs.io/docs/configuration#testenvironment-string
//npm i supertest@3.4.1 --save-dev
const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  add,
} = require('../src/math');

test('Should calculate total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13); // toBe =assertion = if total != 13 throw new Error
  //docs : https://jestjs.io/docs/expect
});

test('Should convert 32 F to 0 C', () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});
// test('Async test demo', done => {//BUG מי שולח את הדאן
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done(); // ללא זה ג'סט לא יידע שזה אסינכרוני ויחזיר מיידית הצלחה כשזה
//מופעל יודעים שפונקציה האסינכרונית הסתיימה
//   }, 2000);
// });
// test('Should add two numbers', done => {
//   add(2, 3).then(sum => {
//     expect(sum).toBe(5);
//     done();
//   });
// });

// // אותו דבר רק יותר נהוג לעשות כך🔽

// // כג'סט רואה אסינק הוא יודע שהוא מחזיר פרומיס לכן יחכה עד שיראה האם פולפיל או ריג'קט
test('Should add two numbers async/await', async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});

// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!
//////////////////
/*
test('Should calculate total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

//בזכות שם הקובץ טסט אז ג'סט יודע שהקובץ מכיל טבט
test('Hello world!', () => {}); // שם הבדיקה ופונקציה של קוד הבדיקה

test('This should fail', () => {
  throw new Error('Failure!');
});
*/
//
// Why test?
//
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind
