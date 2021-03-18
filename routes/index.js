var express = require('express');
var router = express.Router();
const articleModel = require('../models/articles');
const orderModel = require('../models/orders');
const { findById } = require('../models/users');
const userModel = require('../models/users');

/* GET home page. */
router.get('/', async(req, res) => {

  const admin = await userModel.findById('5c52e4efaa4beef85aad5e52');
  const messages = admin.messages;
  const tasks = admin.tasks;

  let unread = 0;
  messages.forEach(message => {
    if(!message.read) {
      unread++
    }
  });

  let todo = 0;
  tasks.forEach(task => {
    if(task.dateCloture === null) {
      todo++
    }
  });

  const unavailable = await articleModel.find({ stock: 0 });

  res.render('index', { unavailable, unread, todo });
});

/* GET tasks page. */
router.get('/tasks-page', async(req, res) => {

  const admin = await userModel.findById('5c52e4efaa4beef85aad5e52');const tasks = admin.tasks;

  res.render('tasks', { tasks });
});

/* GET Messages page. */
router.get('/messages-page', async(req, res) => {

  const admin = await userModel.findById('5c52e4efaa4beef85aad5e52');const messages = admin.messages;

  res.render('messages', { messages });
});

/* GET Users page. */
router.get('/users-page', async (req, res) => {

  const users = await userModel.find();

  res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  
  let catalog = await articleModel.find();
  
  res.render('catalog', { catalog });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async (req, res) => {

  let orders = await orderModel.find();

  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async (req, res) => {
  
  const order = await orderModel
  .findById(req.query.id)
  .populate('articles')
  .exec();

  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async(req, res) => {

  // Chart 1 - Gender repartition
  let users = await userModel.find();

  let males = 0;
  let females = 0;
  users.forEach(user => {
    if(user.gender === "female") {
      females++
    } else {
      males++
    }
  });

  // Chart 2 - Messages

  const admin = await userModel.findById('5c52e4efaa4beef85aad5e52');
  const messages = admin.messages;
  let read = 0;
  let unread = 0;

  messages.forEach(message => {
    if(!message.read) {
      unread++
    } else {
      read++
    }
  });

  // Chart 3 - Sent orders

  const orders = await orderModel.find();
  let sent = 0;
  let unsent = 0;
  orders.forEach(order => {
    if(order.status_payment === 'validated' && order.status_shipment) {
      sent++
    } else if (order.status_payment === 'validated' && !order.status_shipment) {
      unsent++
    };
  });


  // Chart 4 - Profits

  const aggr = orderModel.aggregate();
  
  aggr.match({status_payment: 'validated'});  
  aggr.group({ 
    _id: {
      year: { $year: '$date_insert' },
      month: { $month: '$date_insert' }
    },
    CA: { $sum: '$total'}
   });
   aggr.sort({_id: 1});
  let totalCAByMonth = await aggr.exec();

  res.render('charts', { males, females, read, unread, sent, unsent, totalCAByMonth });
});



module.exports = router;
