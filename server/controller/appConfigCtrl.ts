import BaseCtrl from './baseCtrl';
import AppConfig from '../model/appconfig';

const app = require('../../server/app');

const log = require('log4js').getLogger('AppConfigCtrl');

export default class AppConfigCtrl extends BaseCtrl {
  model = AppConfig;

  loadConfig = (next) => {
      log.info('load config');
  }
}
