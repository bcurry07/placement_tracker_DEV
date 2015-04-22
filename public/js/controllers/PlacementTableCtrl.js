angular.module('app').controller('placementTableCtrl', function($scope, $location, PlacementData, onBillCount, OnBillCountByClient, notifier, editingPlacement, $http) {
  $.material.init();

  $scope.filterText = "";
    //this function is called when a user clicks the x or check icon to update billing status
    $scope.updateBilling = function(placement) {

        //switch the billing status of the placement in the model
        placement.onBilling = !placement.onBilling;


        //update record in database with new billing status
        var placement_id = placement._id;

        $http({method: 'PUT', url: '/api/placements/' + placement_id, data: placement})
            .success(function() {


                notifier.notify('success','Placement updated!');
                getData();
        }).error(function(error) {
            console.log(error);
            notifier.notify('error','Something went wrong!');
                placement.onBilling = !placement.onBilling;


        });






    };

    $scope.sortColumn = "";
    $scope.sortTable = function() {

        if ($scope.reverseSort == true) $scope.placementSortOrder=[$scope.sortColumn, 'date'];
        if ($scope.reverseSort == false) $scope.placementSortOrder=[$scope.sortColumn, '-date'];
    };

    $scope.reverseSort = false; //allows sort to toggle between asc/desc
    $scope.placementSortOrder = "-date"; //default sort is descending by date
    $scope.billingCountSortOrder = "-billCount"; //default sort for On Billing by Client table is descending by count


    //when someone clicks a client in the On Billing by Client table...
    $scope.filterPanelTable = function(item) {
        //$scope.filterOnBilling = "yes"; //the main table only displays active billing
        $scope.filterClient = item.client; //the main table only displays the clicked client
        $scope.selected = item; //the item selected will show the filtered icon based on this variable which is used in $scope.isSelected
    };

    $scope.isSelected = function(item){
        return $scope.selected === item; //only returns true for the item selected so only that client will have the filter icon appear next to it
    };

    //function created to get all display data. created a function to reuse within controller
    var getData = function() {

        PlacementData.query().$promise.then(function (data) { //resource query gets data
//          $.each(data, function(index, placement) {
//            if(placement.onBilling == "Yes") {
//              placement.onBilling = true;
//            }
//            else {
//              placement.onBilling = false;
//            }
//
//          });

            $scope.placements = data; //set placement data on scope

            $scope.onBillingCount = onBillCount.getCount(data); //set scope variable for OnBilling badge which counts total # on billing

            //get data for On Billing by Client table and set on scope
            OnBillCountByClient.getList($scope.placements).then(function (list) {
                $scope.list = list;
            });
        });
    };

    //when someone clicks the filter icon to remove the filter...
    $scope.removeFilter = function() {
        $scope.filterOnBilling = ""; //onBilling filter removed from main table
        $scope.filterClient = ""; //client filter removed from main table
        $scope.selected = ""; //no filter item selected so the icon should disappear when this variable is cleared out and then used in $scope.isSelected
    };

    //clicking the add button takes the user to the add new placement form
    $scope.addNew = function() {
        $location.url('/new');
    };

    //clicking a consultant name takes the user to the edit placement form
    $scope.editPlacement = function(placement) {
        editingPlacement.selectedPlacement = placement; //communicate the clicked placement via a service
      var placementId = placement._id;
        $location.url('/edit/' + placementId); //pass in the id with the URL to be used by the editPlacementCtrl
    };


    //sets a scope variable for the clicked placement when user clicks the
    //delete button so the overlay knows which one was clicked and therefore which to delete
    $scope.setPlacementToDelete = function(placement) {
        $scope.placementToDelete = placement;
    };

    //actually removes the placement from the db
    $scope.deletePlacement = function() {
        var placementId = $scope.placementToDelete._id;
        PlacementData.remove({_id: placementId}, function() {
            getData(); //refreshes the data after delete
            notifier.notify('success','Placement deleted');
        }, function(error) {
            console.log(error);
            notifier.notify('error','Something went wrong!');
        });



    };


    getData(); //gets data initially to display on page upon load


});

