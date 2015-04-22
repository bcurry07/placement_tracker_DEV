//angular oob filter was outputting wrong date - it was converting 8/1/14 00:00:00 to 7/31/13 due to timezone issue
//therefore I created this custom filter to correct date display value
//for some reason in production, Mar 1 would come out as Feb 1, and 1/1/14 would come out as 1/1/13

angular.module('app').filter('dateFilter', function($filter) {
   return function(item) {


       var trueDate = new Date(item).getUTCDate(); //get true date using UTC
       var trueMonth = new Date(item).getUTCMonth();
       var trueYear = new Date(item).getUTCFullYear();

       var trueDateValue = new Date(item);
       trueDateValue.setDate(trueDate);
       trueDateValue.setMonth(trueMonth);
       trueDateValue.setYear(trueYear);

        return $filter('date')(trueDateValue, 'shortDate');



   };
});
