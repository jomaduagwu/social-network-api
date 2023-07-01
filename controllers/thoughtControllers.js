const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } }, // changed from $addToSet, posts to thought
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

//   update a thought
  async updateThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true}
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!'});
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndRemove(
        { _id: req.params.thoughtId}
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!'});
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId }},
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Thought deleted but no user with this id!'});
      }
      res.json({ message: 'Thought successfully deleted!'});
    } catch (err) {
      res.status(500).json(err);
    }
  },

// create a reaction
  async createReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: {reactions: req.body }}, // Updated from $addToSet to $push
        {runValidators: true, new: true}
      );
      if (!thoughts) {
        return res.status(404).json({message: 'No thought with this id!'});
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a reaction
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: {reactionId: req.params.reactionId }}},
        {runValidators: true, new: true}
      );
      if (!thoughts) {
        return res.status(404).json({message: 'No thought with this id!'});
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
