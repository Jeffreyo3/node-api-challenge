const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    Actions.get()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

// PUT
router.put('/:id', validateId, (req, res) => {
    const { id } = req.params;
    const { project_id } = req.params;
    let updateAction = { project_id: project_id, ...req.body };

    if (!updateAction.notes || !updateAction.description) {
        res.status(400).json({ message: "You must include a notes and description" })
    } else {
        Actions.update(id, updateAction)
            .then(action => {
                res.status(201).json(action);
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    }
})

// DELETE 
router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(remove => {
            res.status(200).json(`Removed ${remove} action from the database`);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
})





//// custom middleware to validate ID ////
function validateId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(project => {
            if (project) {
                req.id = id;
                next();
            } else {
                res.status(400).json({ message: "No action with that ID was found" });
            }
        })
        .catch(err => {
            console.log("validateId error: ", err);
            res.status(500).json(err.message);
        });
};

module.exports = router;