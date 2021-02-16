import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as log4js from 'log4js';


import setRoutes from './routes';
import AppConfigCtrl from './controller/appConfigCtrl';
import * as jwt from 'jsonwebtoken';
import User from './model/user';
const AppConstants = require('./constants/appconstants');

log4js.configure({
    appenders: { pstudios: { type: 'file', filename: 'consultantcy-server.log' } },
    categories: { default: { appenders: ['pstudios'], level: 'debug' } }
});

const log = log4js.getLogger('app');

const app = express();
dotenv.config({ path: '.env' });
app.set('port', (process.env.PORT || AppConstants.APP_PORT));

app.use('/', express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ## CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Accept', 'application/json');
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);

    } else if (req.url && req.url.startsWith('/api/secure')) {
        log.info(req.url);
        const token = req.headers['authorization'];

        // log.info('Request: ' + req.method + ' token from headers app.ts: ', token);

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // {password: 0} is projection added to never return a password.
            User.findOne({ email: decoded.user.email }, { password: 0 }, (userErr, user) => {
                if (userErr) {
                    log.error('There was a problem finding the user.', userErr);
                    return res.status(500).send('There was a problem finding the user.');
                }
                if (!user) {
                    log.info('User not found');
                    return res.status(404).send('User not found.');
                } else {
                    log.info('User found and authenticated: ', user.email);
                    next();
                }
            });
        });
    } else {
        next();
    }
};
app.use(allowCrossDomain);

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
} else {
    mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const mongodb = mongoose.connect(mongodbURI, { useUnifiedTopology: true, useNewUrlParser: true });

mongodb
    .then((db) => {
        log.info('Connected to MongoDB on', db.connections[0].host + ':' + db.connections[0].port);

        setRoutes(app);

        app.get('/*', function (req, res) {

            let pathDir = path.join(__dirname, '/../client/index.html');
            res.type('html');
            res.sendFile(path.join(pathDir));
        });

        if (!module.parent) {
            app.listen(app.get('port'), () => {
                console.log('Server listening on port ' + app.get('port'));
                log.info('Server listening on port ' + app.get('port'));

                const appConfigCtrl = new AppConfigCtrl();
                appConfigCtrl.loadConfig(errorHandler);
            });
        }

    })
    .catch((err) => {
        log.error(err);
        console.log(err);
    });

/*process.on('unCaughtException', errorHandler);*/
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    log.error('Error occurred: ', err);
    // res.status(500).json({ error: err.message });
}
app.use(errorHandler);

if (process.env.SERVER_ENV === 'PROD') {
    app.use('/', express.static(path.join(__dirname, '../client')));
}

export { app };
