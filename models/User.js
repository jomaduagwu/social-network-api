const { Schema, Types, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/,
    //   validate: 
    //     {validator: function(v) 
    //         {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},
    //             message: props => `${props.value} is not a valid email address!`}
    },
    thoughts: [
        {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    //   Array of _id values referencing the Thought model
    }
],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
