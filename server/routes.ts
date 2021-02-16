import * as express from 'express';
import AppConfigCtrl from "./controller/appConfigCtrl";
import UserCtrl from './controller/userCtrl';
import QueryCtrl from './controller/queryCtrl';

export default function setRoutes(app) {
  const router = express.Router();

  const appConfigCtrl = new AppConfigCtrl();
  const userCtrl = new UserCtrl();
  const queryCtrl = new QueryCtrl();

  // App configs
  router.route('/appconfig').get(appConfigCtrl.getAll);
  router.route('/appconfig').post(appConfigCtrl.insert);


  //User
  router.route('/login').post(userCtrl.login);
  router.route('/signup').post(userCtrl.insert);
  router.route('/secure/user/:id').get(userCtrl.get);
  router.route('/secure/user/:id').put(userCtrl.update);


  //Query
  router.route('/query').get(queryCtrl.getAll);
  router.route('/query/:id').get(queryCtrl.get);
  router.route('/query').post(queryCtrl.insert);
  router.route('/query').put(queryCtrl.update);


  // Apply the routes to the application with the prefix /api
  app.use('/api', router);

}
