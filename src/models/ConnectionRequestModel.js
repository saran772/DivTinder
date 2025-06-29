const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema({
    fromuserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    touserid: {
        type: mongoose.Schema.Types.ObjectId,
            ref:"user",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"]
        }
    }
}, {
    timestamps: true,
});
ConnectionRequestSchema.index({fromuserId:1,touserid:1})//creating an index

ConnectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromuserId.equals(connectionRequest.touserid)) {
        throw new Error("cannot send connection to yourself");
    }
    next();
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;
