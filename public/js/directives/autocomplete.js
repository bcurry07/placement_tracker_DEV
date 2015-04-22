//autocompelte jquery ui

angular.module('app').directive('autoComplete', function($timeout, OnBillCountByClient) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            OnBillCountByClient.getClients().then(function(clients) {

                element.autocomplete({
                    source: clients,
                    select: function() {
                        $timeout(function() {
                            element.trigger('input');
                        }, 0);
                    }

                });

            });



        }

    }
});

//get unique clients using the service to be used as source data for autocomplete


//this select function allows the selected client name to be saved to the ng-model
//otherwise the ng-model will only save the characters actually typed by the user
//and not necessarily the entire client name



//this 10 sec timeout prevents the drop-down from appearing after 10 seconds of selecting a client
//otherwise upon selecting the client the drop-down will appear and remain suggesting that same client name
//which was a byproduct of adding the select function