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

router.get('/:id', validateId, (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => res.status(500).json(err.message))
})

router.get('/:id/actions', validateId, (req, res) => {
    const {id} = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})












function validateId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then(project => {
        if (project) {
          req.id = id;
          next();
        } else {
          res.status(400).json({message: "No project with that ID was found"});
        }
      })
      .catch(err => {
        console.log("validateId error: ", err);
        res.status(500).json(err.message);
      });
  };

module.exports = router;