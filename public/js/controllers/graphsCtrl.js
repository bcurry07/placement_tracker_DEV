angular.module('app').controller('graphsCtrl', function($scope, $location, yearlyData) {
  $.material.init();

        //declare years array to hold year data for graphs page so it can be called using ng-repeat in html
        $scope.years = [];

        var currentYear = new Date().getUTCFullYear(); //get current year to get and display that data on graphs page
        var prevYear = currentYear - 1; //get previous year to get and display that data on graphs page
        var twoPrevYear = prevYear - 1;

        //this gets the data for the current year, including # of perm deals and # of contract deals
        yearlyData.getData(currentYear).then(function(data) {
            var currentYear_contract = data.contract;
            var currentYear_perm = data.perm;

            //this pushes all of the necessary current year data to the years array so it can be displayed via ng-repeat directive
            $scope.years.push({
                year: currentYear,
                contractCount: currentYear_contract,
                permCount: currentYear_perm
            });


        });

    //this gets the data for the previous year, including # of perm deals and # of contract deals
        yearlyData.getData(prevYear).then(function(data) {
            var prevYear_contract = data.contract;
            var prevYear_perm = data.perm;

            //this pushes all of the necessary previous year data to the years array so it can be displayed via ng-repeat directive
            $scope.years.push({
                year: prevYear,
                contractCount: prevYear_contract,
                permCount: prevYear_perm
            });


    });

  //this gets the data for the previous year, including # of perm deals and # of contract deals
  yearlyData.getData(twoPrevYear).then(function(data) {
    var prevYear_contract = data.contract;
    var prevYear_perm = data.perm;

    //this pushes all of the necessary previous year data to the years array so it can be displayed via ng-repeat directive
    $scope.years.push({
      year: twoPrevYear,
      contractCount: prevYear_contract,
      permCount: prevYear_perm
    });


  });



});






