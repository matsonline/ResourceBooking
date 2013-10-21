rbApp.controller('rbCtrl', ['$scope','$q', 'ubgResources', 'bookingFactory', 'filterResources', 'dialogDateTimeFormatter', function ($scope, $q, ubgResources, bookingFactory, filterResources, dialogDateTimeFormatter) {



    //$scope.Resources = ubgResources;
    $scope.showStartDateValidationError = false;
    $scope.showEndDateValidationError = false;
    $scope.freeResources = ubgResources;
    $scope.getFreeResources = function () {
        if (($scope.startDateTime != 'none') && ($scope.endDateTime != 'none')) {
            $scope.filter.startDateTime = $scope.startDateTime;
            $scope.filter.endDateTime = $scope.endDateTime;
            $scope.getBookings().then(function (promise) {
                $scope.freeResources = filterResources.filter(ubgResources, $scope.bookings);
                $scope.showRoomsForDate = true;
                $scope.datumDialog.setDateTime();

            });
        }
        else if ($scope.startDateTime == 'none') {
            $scope.showStartDateValidationError = true;
        }
        else if ($scope.endDateTime == 'none') {
            $scope.showEndDateValidationError = true;
        }
        else
            console.log("something is wrong");

    };

    

    
    // datumPage
    $scope.dateInputLayout = "native"

    $scope.startDateTime = "none";
    $scope.endDateTime = "none";

    $scope.startDateChange = function () {
        $scope.startDateTime = $('#datetime-start').val();
        $scope.showStartDateValidationError = false;

    };

    $scope.endDateChange = function () {
        $scope.endDateTime = $('#datetime-end').val();
        $scope.showEndDateValidationError = false;
    };


    $scope.showRoomsForDate = false;
    $scope.hideRoomsForDate = function () {
        $scope.showRoomsForDate = false;
        $scope.datePageWizard = 'step1'


    }
    $scope.datePageWizard = 'step1';

    $scope.resourceClick = function (resource) {
        $scope.datumDialog.resource = resource;
        $scope.filter.roomTitle = resource;
    }

    // rbSliderDate
    $scope.slider = {
        left: "08:00",
        right:"09:00"
    }

    $scope.sliderDateObject = {
        datestring: "2013-10-15",
        dayofweek: "",
        weeknumber: 42
    }
    

    // datumDialog
    $scope.datumDialog = {
        resource: "",
        //date: $scope.sliderDateObject.datestring,
        //time: $scope.slider.left + "-" + $scope.slider.right,
        date: "2000-01-01",
        time: "00:00 - 01:00",
        user: "Ulf Peterson",
        setDateTime: function () {
            this.date = dialogDateTimeFormatter.getDate($scope.startDateTime);
            this.time = dialogDateTimeFormatter.getTime($scope.startDateTime, $scope.endDateTime)
        }
    }

    // **********************
    // *** Back-end services 
    // **********************

    $scope.filter = {
        roomTitle: "",
        startDateTime: "",
        endDateTime: "",
    }
    $scope.bookings = [];
    //$scope.$watch('bookings', function (newValue, oldValue) {
    //    if (newValue.length > 0)
    //    console.log("bookings: " + newValue[0].roomTitle);
    //});
    

    // GET
    $scope.getBookings = function () {
        var deferred = $q.defer();
        bookingFactory.getBookings($scope.filter).then(function (promise1) {
            $scope.bookings = promise1;

            deferred.resolve($scope.bookings);
        });

        return deferred.promise;
    };
    // ADD
    $scope.addBooking = function () {
        bookingFactory.addEvent(bookingObj).then(function (promise) {
            $scope.getBookings();
        });

    };
    // Remove
    $scope.removeBooking = function (id) {
        bookingFactory.removeBooking(id);
        $scope.getBookings();
    };
    // Update event
    $scope.updateEvent = function () {
        bookingFactory.updateBooig(bookingObj).then(function (promise) {
            $scope.getBookings();
        });

    };

}]);