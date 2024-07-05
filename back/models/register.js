const mongoose = require('mongoose');
const regSchema = mongoose.Schema({

    user_name: {
        type: String , 
        required: true
    },

    password: {
        type: String,
        required: true
    },
   
    date:{
        type: Date, 
        default: Date.now()
    }

})

module.exports = mongoose.model('reg', regSchema);

