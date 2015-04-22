//service allows communicating between main page and edit page for which item was clicked so edit page knows which placement to display
//this saves having to call the backend again on the edit page
//however the down-side is that if someone simply refreshes the edit page then the scope does not have any placement value

angular.module('app').factory('editingPlacement', function() {
   return {
       selectedPlacement : {}
   }
});