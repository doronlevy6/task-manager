// "testEnvironment": "node" בפקג'
const request = require('supertest');
const app = require('../src/app'); // כי האפפ לא עושה ליסטן
const User = require('../src/models/user');
const userOne = {
  name: 'Mike334',
  email: 'mike@example.com',
  password: '56what!',
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      // למעשה בזה אני שולח את הנתונים שהייתי מעביר בפוסטמן מן
      // בבודי של  הריקווסט אל האנדפוינט
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'MyPass777!',
    })
    .expect(201); // BUG לא ברור אופן השימוש באקספקט
  console.log('ppp', response.body._id);
  // Assert that the database was changed correctly
  const user = await User.findById(response.body._id);
  expect(user).not.toBeNull();

  // // Assertions about the response
  expect(response.body).toMatchObject(
    {
      name: 'Andrew',
      email: 'andrew@example.com', // לשים עוד שדות זה אפציונלי
    }
    // token: user.tokens[0].token,
  );
  expect(user.password).toBe('MyPass777!');
});

/////// **  אין לי אנדפוינט לוגין

// test('Should login existing user', async () => {
//   await request(app)
//     .post('/users/login')
//     .send({
//       email: userOne.email,
//       password: userOne.password,
//     })
//     .expect(200);
// });

// test('Should not login nonexistent user', async () => {
//   await request(app)
//     .post('/users/login')
//     .send({
//       email: userOne.email,
//       password: 'thisisnotmypass',
//     })
//     .expect(400);
// });
