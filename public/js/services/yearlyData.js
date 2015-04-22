//need this service to provide # of contract and # of perm deals for each year to display next to graphs

angular.module('app').factory('yearlyData', function($http, $q) {

        return {
            getData: function(year) { //function takes in the year from the controller to send that year's data back into the scope for the graphs page


                var deferred = $q.defer();

                $http.get('/api/placements').then(function(response) {

                    //define object variable to hold both contract and perm data for the year requested
                    var placementTypeCount = {
                        "contract": 0,
                        "perm": 0
                    };

                    var placements = response.data;

                    placements.forEach(function(placement) { //iterate through each placement

                        var date = new Date(placement.date);

                        //if placement date is for that year and its a contract deal then add to contract count
                        if((date.getUTCFullYear() == year) && (placement.type === "Contract")) {
                            placementTypeCount.contract++;
                        }
                        //else if placement date is for that year and its a perm deal then add to perm count
                        else if((date.getUTCFullYear() == year)&& (placement.type === "Perm")) {
                            placementTypeCount.perm++;
                        }

                    });

                    deferred.resolve(placementTypeCount);
                });

                return deferred.promise;
            }

        }
});