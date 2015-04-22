//this service defines 'notifier' as our angular service to call the toastr plug-in for notifications

angular.module('app').value('toastr', toastr);

angular.module('app').factory('notifier', function(toastr) {
   return {
       notify: function(type, msg, close, position, timeout) {

         if(!close) close = true;
         if(!position) position = "toast-bottom-left";
         if(!timeout) timeout = 5000;

          toastr.options = {
            closeButton: close,
            positionClass: position,
            timeOut: timeout
          };

           if(type === "success") {
               toastr.success(msg);
           }
           else if(type === "error") {
               toastr.error(msg);
           }
           else if(type === "warning") {
             toastr.warning(msg);
           }
       }
   }
});