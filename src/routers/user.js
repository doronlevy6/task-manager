const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// פה לא מעניין אותנו הערך המוחזר אבל בכל זאת הוספנו אסינק
// רק בכדי שנוכל להשתמש בא-וואיט

router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;
