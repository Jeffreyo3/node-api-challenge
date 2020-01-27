const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    Projects.get()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => res.status(500).json(err.message))
})

router.get('/:id/actions', validateId, (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

// POST
router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ message: "You must include a name and description" })
    } else {
        Projects.insert(newProject)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
})

router.post('/:id', validateId, (req, res) => {
    const { id } = req.params;
    let newAction = req.body;
    newAction = { project_id: id, ...newAction };
    if (!newAction.notes || !newAction.description) {
        res.status(400).json({ message: "You must include a notes and description" })
    } else {
        Actions.insert(newAction)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    }
});

// PUT
router.put('/:id', validateId, (req, res) => {
    const updateProject = req.body;
    const { id } = req.params;
    if (!updateProject.name || !updateProject.description) {
        res.status(400).json({ message: "You must include a name and description" })
    } else {
        Projects.update(id, updateProject)
            .then(update => {
                res.status(201).json(update)
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    }
})

// DELETE
router.delete('/:id', validateId, (req, res) => {
    const { id }  = req.params;
    Projects.remove(id)
        .then(remove => {
            res.status(200).json(`Removed ${remove} item from the database`);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
})



//// custom middleware to validate ID ////
function validateId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (project) {
                req.id = id;
                next();
            } else {
                res.status(400).json({ message: "No project with that ID was found" });
            }
        })
        .catch(err => {
            console.log("validateId error: ", err);
            res.status(500).json(err.message);
        });
};

module.exports = router;