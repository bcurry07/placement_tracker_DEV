var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var placementSchema = mongoose.Schema({
    name: String,
    date: Date,
    client: String,
    onBilling: Boolean,
    type: String,
    notes: String
});

placementSchema.plugin(timestamps);

var Placement = mongoose.model('Placement', placementSchema);

function createDefaultPlacements() {
    Placement.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Placement.create({name: "Jozy Altidore", date: new Date('06/01/2014') , client: "USA", onBilling: "No", type: "Perm", notes: "Sunderland"});
        }
    });
}

exports.createDefaultPlacements = createDefaultPlacements;