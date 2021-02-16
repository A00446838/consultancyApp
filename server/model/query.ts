import * as mongoose from 'mongoose';
const uuidv4 = require('uuid/v4');

const querySchema = new mongoose.Schema({
    index: { type: String, index: true, default: uuidv4 },
    ownerEmail: { type: String },
    issueTitle: { type: String },
    issue: { type: String },
    category: { type: String },
    consultant: { type: String },
    isApproved: { type: Boolean, default: false },
});

const Query = mongoose.model('query', querySchema);

export default Query;
