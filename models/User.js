const { Schema, Types, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username is already in use!"],
      required: true,
      trimm: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/,
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

const User = model('User', userSchema);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});



module.exports = User;
