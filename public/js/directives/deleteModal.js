//delete confirmation modal created as directive to clean up main.html

angular.module('app').directive('deleteModal', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/deleteModal'

    }
});