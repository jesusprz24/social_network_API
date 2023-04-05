const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

router.get('/', thoughtController.getThoughts);
router.post('/', thoughtController.createThought);
router.get('/:thoughtId', thoughtController.getSingleThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);
router.post('/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
