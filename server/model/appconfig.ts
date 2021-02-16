import * as mongoose from 'mongoose';
const uuidv4 = require('uuid/v4');

const appConfigSchema = new mongoose.Schema({
  index: {type: String, index: true, default: uuidv4},
  configKey: { type: String, unique: true, trim: true },
  configValue: String
});

const AppConfig = mongoose.model('appconfig', appConfigSchema);

export default AppConfig;
