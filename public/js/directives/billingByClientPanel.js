//billing by client panel created as directive to clean up main.html

angular.module('app').directive('billingByClientPanel', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/billingByClient'

    }
});