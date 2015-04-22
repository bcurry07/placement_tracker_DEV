//angular resource service to aid in back-end calls to api

angular.module('app').factory('PlacementData', function($resource) {
    return $resource('/api/placements/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false},
        get: {method: 'GET', isArray:true},
        post: {method: 'POST', isArray:false}
    });

});