const log = require('log4js').getLogger('BaseCtrl');
abstract class BaseCtrl {
  abstract model: any;

  // Get all
  getAll = (req, res, next) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        log.error('Error while finding all the documents: ', err);
      }
      res.status(200).json(docs);
    });
  };

  // Count all
  count = (req, res, next) => {
    this.model.count((err, count) => {
      if (err) {
        log.error('Error while finding the count: ', err);
      }
      res.status(200).json(count);
    });
  };

  // Insert
  insert = (req, res, next) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        log.error('Error while inserting the document: ', err);
      }
      res.status(200).json(item);
    });
  };

  // Get by id
  get = (req, res, next) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) {
        log.error('Error while fetching the document: ', err);
      }
      res.status(200).json(item);
    });
  };

  // Update by id
  update = (req, res, next) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        log.error('Error while updating the document: ', err);
      }
      res.status(200).json({status: 'OK'});
    });
  };

  // Delete by id
  delete = (req, res, next) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        log.error('Error while deleting the document: ', err);
      }
      res.status(200).json({status: 'OK'});
    });
  }
}

export default BaseCtrl;
