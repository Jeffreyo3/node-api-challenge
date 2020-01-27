const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(list => {
            if (list) {
                res.status(200).json(list);
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

module.exports = router;