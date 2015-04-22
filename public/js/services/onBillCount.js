//this service counts total # of billing consultants for the badge on the main page

angular.module('app').factory('onBillCount', function() {

    return {
        getCount: function(data) {

            var count = 0;
            data.forEach(function(placement) {
                if (placement.onBilling) count++;
            });
            return count;
        }

    }

});


//this service returns unique clients and also provides the data for the On Billing by Client table
angular.module('app').factory('OnBillCountByClient', function($http, $q) {
    return {
        getClients: function() { //gets unique clients
            var deferred = $q.defer(); //use $q with $http to return data captured by async http call

            $http.get('/api/billingclients').then(function(response) { //ultimately queries the mongoDB using a 'distinct' query to get unique clients

                deferred.resolve(response.data);
            });

            return deferred.promise;
        },

        getList: function(placements) { //creates list of unique billing clients with the # count

            var deferred = $q.defer();

            this.getClients().then(function(uniqueClientList) { //gets unique clients from getClients in this service using 'this'
                var list = [];


                uniqueClientList.forEach(function(client) { //iterate through each unique client
                    var clientBillCount = 0;
                    var clientCount = 0;
                    placements.forEach(function(placement) { //iterate through each placement

                        //if placement matches current client and is on billing then add to the count
                       if (placement.client === client) {
                           clientCount++;
                           if (placement.onBilling) {
                               clientBillCount++;
                           }
                       }

                    });

                    //only push clients that have a count > 0
                    list.push({"client": client, "billCount": clientBillCount, "count": clientCount});
                });
               deferred.resolve(list);
            });

            return deferred.promise;
        }
    };
});

