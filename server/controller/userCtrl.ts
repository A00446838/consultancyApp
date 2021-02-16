import BaseCtrl from './baseCtrl';
import * as jwt from 'jsonwebtoken';
import User from '../model/user';
const log = require('log4js').getLogger('UserCtrl');

export default class UserCtrl extends BaseCtrl {
  model = User;


  // Get all, isDeleted: false
  getAll = (req, res, next) => {
    try {
      this.model.find({ isDeleted: false }, (err, docs) => {
        if (err) {
          log.error('Error while fetching all the users', err);
        }
        res.status(200).json(docs);
      });
    } catch (error) {
      log.error('Error while fetching all the users', error);
    }
  }

  getAllUsersByRole = (req, res, next) => {
    try {
      this.model.find({ isDeleted: false, role: req.params.role }, (err, docs) => {
        if (err) {
          log.error('Error while fetching all the users for role: ' + req.params.role, err);
        }
        res.status(200).json(docs);
      });
    } catch (error) {
      log.error('Error while fetching all the users for role: ' + req.params.role, error);
    }
  }


  // Get by id, isDeleted: false
  get = (req, res, next) => {
    try {
      this.model.findOne({ _id: req.params.id, isDeleted: false }, (err, item) => {
        if (err) {
          log.error('Error while fetching the user by id. ', err);
        }
        res.status(200).json(item);
      });
    } catch (error) {
      log.error('Error while fetching the user by id. ', error);
    }
  }

  insert = (req, res, next) => {
    log.info('creating user');
    try {
      log.debug('request sent to create a user: ', req.body);
      const obj = new this.model(req.body);
      obj.role = 'user';
      obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          log.error('User already exists. ', err);
        }
        if (err) { // error
          log.error('error while creating user', err);
        } else { // success
          log.info('user successfully created');
          //  this.sendAccountVerificationMail(req, res, next);
        }

        res.status(200).json(item);
      });
    } catch (error) {
      log.error('error while creating user', error);
    }
  }

  login = (req, res, next) => {
    log.info('request body: ', req.body);
    try {
      this.model.findOne({ email: req.body.email, isDeleted: false }, (err, user) => {
        if (err) {
          log.error('error while finding a user with email: ' + req.body.email, err);
        }
        if (!user) {
          return res.sendStatus(401);
        }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (error) { return next(error); }
          if (!isMatch) {
            return res.sendStatus(401);
          }/*
          if (!user.isAccountVerified) {
            return res.sendStatus(412);
          }*/
          const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
          const loginTime = new Date();
          log.debug('User: ' + user.email + ' has logged into system at: ' + loginTime);
          user.lastLoginTime = loginTime;
          user.save((userErr, usr) => {
            if (userErr) {
              log.error('Error while saving lastLoginTime', userErr);
            }
            log.info('lastLoginTime saved successfully.');
          });
          res.status(200).json({ token: token });
        });
      });
    } catch (error) {
      log.error('error while login: ', error);
    }
  }
}
