angular.module('app').directive('ngAutoFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

                element.focus();

        }

    }
});