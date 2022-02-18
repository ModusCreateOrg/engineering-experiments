const express = require('express');
const router = express.Router();
const Agenda = require("agenda");

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const mongoConnectionString = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}`;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Agendajs Test Server' });
});

router.get('/schedule-basic', function(req, res, next) {
    const agenda = new Agenda({ db: { address: mongoConnectionString } });

    // Log action every minute 
    agenda.define("perform an action", async(job) => {
        console.log('An action is running!');
    });

    (async function() {
        // IIFE to give access to async/await
        await agenda.start();
        await agenda.every("5 seconds", "perform an action");
    })();
    console.log("Let`s see Agenda in action!!!");
    res.send('Agenda jobs started!');
});

router.get('/schedule-with-data', function(req, res, next) {

    const agenda = new Agenda({ db: { address: mongoConnectionString } });

    agenda.define(
        "send welcome package", { priority: "high", concurrency: 10 },
        async(job) => {
            const { to } = job.attrs.data;
            await emailClient.send({
                to,
                from: "example@example.com",
                subject: "Welcome Package",
                body: "...",
            });
        }
    );

    (async function() {
        await agenda.start();
        await agenda.schedule("in 30 minutes", "send welcome package", {
            to: "new@example.com",
        });
    })();
    res.send('Agenda jobs started!');
});

module.exports = router;