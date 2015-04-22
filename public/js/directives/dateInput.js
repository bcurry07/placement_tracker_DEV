//jquery ui datepicker

angular.module('app').directive('dateInput', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.datepicker();
        }

    }
});