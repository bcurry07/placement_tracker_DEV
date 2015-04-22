

angular.module('app').filter('onBillingIcon', function() {
    return function(item) {



        if (item == "Yes") {

            return true;

        }
        else {

            return false;
        }

    };
});
