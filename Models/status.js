const mongoose = require('mongoose');

const important = {
    type: String,
    required: true
}

const statusSchema = mongoose.Schema({
    user_id: important,
    msg: {
        type: String
    },
    time: important,
    fileUrl: important,
});

const Status = mongoose.model("Status", statusSchema);
const DeletedStatus = mongoose.model("DeletedStatus", statusSchema);

module.exports = { Status, DeletedStatus };
