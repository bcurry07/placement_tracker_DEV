var Placement = require('mongoose').model('Placement');

//GET all
exports.getPlacements = function(req, res) {

    Placement.find({}).exec(function(err, collection) {

        res.send(collection);
    });
};

//GET by id
exports.getPlacement = function(req, res) {

    Placement.find({"_id" : req.params.placementId}).exec(function(err, placement) {
        res.json(placement);
    });
};

//UPDATE by id
exports.updatePlacement = function(req, res) {

    if(!req.body.notes) {
        req.body.notes = "";
    }


    var placement = {
        "name": req.body.name,
        "date": req.body.date,
        "client": req.body.client,
        "type": req.body.type,
        "onBilling": req.body.onBilling,
        "notes": req.body.notes
    };



    Placement.update({ _id: req.params.placementId }, { $set: placement }, function(error, result) {
        if(error) {
            console.log('there was an error: ' + error);
            res.send(500, { error: error });
            return;
        }
        res.json(result);


    });

};

//ADD new
exports.addPlacement = function(req, res) {

    if(!req.body.notes) {
        req.body.notes = "";
    }
    var newPlacement = new Placement(req.body);
    console.log(newPlacement);

    newPlacement.save(function(err, result) {

        if(err) {
            res.send(500, {error: err});

            return;
        }
        res.json(result);
    });
};

//delete Placement
exports.deletePlacement = function(req, res) {

    Placement.remove({ _id: req.params.placementId }, function(error, result) {
        if(error) {
            console.log('there was an error: ' + error);
            res.send(500, { error: error });
            return;
        }
        res.json(result);


    });

};

//*************************************************************************

exports.getBillingClients = function(req, res) {

    Placement.distinct('client', function(err, collection) {

        res.send(collection);

    });
};