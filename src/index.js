const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
// פיצול בין ליסטן לאקספרס🔽
/*
////////////////////////////////////
// הקונונציה היא שגט ודליט זה ללא בודי ופאטצ' ופוסט מגיע עם בודי
//איפה שלא חייבים בודי לא עושים זה מעמיס על התעבורה
// npm run dev
// בפוסטמן צריך לעשות קונטרול אס על מנת שמשהו יישמר
const express = require('express');
require('./db/mongoose'); //That's going to ensure that the file runs and it's going to ensure that mongoose connects to the database.

// const User = require('./models/user');
// const Task = require('./models/task');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

////////////////////////////////////////////
/// כל מה שלהלן פוצל לקבצי ראוטר
/*
// פה לא מעניין אותנו הערך המוחזר אבל בכל זאת הוספנו אסינק
// רק בכדי שנוכל להשתמש בא-וואיט

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save(); // בגלל שזה לא מחזיר כלום אז לא צריך לשמור זאת במשתנה אלא רק לחכות לביצוע הפרומיס
    // אם הפרומיס ריגקט אז זה יפעיל את הקאטצ' ואם לא אז ימשיך לפקודה הבאה,רסיפונס..
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
  //=🔼
  // user
  //   .save()
  //   .then(() => {
  //     res.send(user);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e); //בכדי לשנות את הסטטוס ל400
  //     //    בלי זה הוא נשאר 200 וזה מטעה
  //   });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});
app.patch('/users/:id', async (req, res) => {
  // המטרה ב 5 שורות  הקוד להלן היא להחזיר סטטוס 400 על נסיון לשנות שדה שלא קיים בקולקשיין, אם לא נעשה זאת אז יישלח סטטוס 200
  //כי מונגוס יחזיר את הדוקיומנט שמצאנו ויתעלם מהשדה החדש ששלחנו בבודי

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  //  every =עובר בלופ על  האיברים במערך ומחזיר טרו עם כל  הלופים מחזיר טרו
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  // //docs:Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // נחזיר את היוזר המעודכן ולא את המקורי
      runValidators: true, //מוודאים שנקבל שנריץ ולידדיישין כפי שמוגדר במודל
    });

    if (!user) {
      // אם לא מצאנו יוזר מתאים
      console.log(user);
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
//////
//שמתי את זה למעלה כפיצלנו קבצים אבל כשלא מפצלים אז צריך להשאיר פה 
// app.listen(port, () => {
//   console.log('Server is up on port ' + port);
// });

///////////////////////////////////////////
//ללא סינק אוואיט

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e); //בכדי לשנות את הסטטוס ל400
      //    בלי זה הוא נשאר 200 וזה מטעה
    });
});

app.get('/users', (req, res) => {
  User.find({}) //This is going to fetch all users stored in the database.
    .then(users => {
      res.send(users);
    })
    .catch(e => {
      res.status(500).send();
    });
});

// מה שאשלח בשורת הכתובת ייכנס כערך למשתנה שהגדרתי כאיי.די
// כל שם שארשום במקום האיידי הוא טוב, זה שם משתנה
//https://mongoosejs.com/docs/queries.html

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
*/
