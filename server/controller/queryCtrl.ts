import BaseCtrl from './baseCtrl';
import Query from '../model/query';

const app = require('../../server/app');

const log = require('log4js').getLogger('QueryCtrl');

export default class QueryCtrl extends BaseCtrl {
    model = Query;
}
