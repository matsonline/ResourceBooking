rbApp.constant('ubgResources', ['Samlingssalen', 'Stora konferensrummet', 'Glaskonferensen', 'Datavagn 1', 'Datavagn 2', 'Datasal 1', 'Datasal 2', 'Hus 1', 'Hus 2', 'Hus 3', 'Hus 4', 'Hus 5', 'Hus 7', 'Hus 9']);

rbApp.constant('ubgUsers', ['Ulf Peterson', 'Mats Edvardsson']);

rbApp.factory('bookingFactory', ['$http', '$q', function ($http, $q) {

    var url = '/api/Mobileapi';

    var errorCallback = function (data, status, headers, config) {
        console.log("Error!");
    };
    var successCallback = function (data, status, headers, config) {
        console.log('Event action was successfuly handeled');
    };

    return {
        // GET
        getBookings: function (filterobject) {
            var deferred = $q.defer();
            var config = { method: 'GET', url: url, params: filterobject };
            var successGetBookingsCallback = function (data, status) {

                deferred.resolve(data);
            };

            $http(config).success(successGetBookingsCallback).error(errorCallback);

            return deferred.promise;
        },
        // Remove
        removeEvents: function () {

        },
        // Add
        addBooking: function (bookingObj) {
            var deferred = $q.defer();
            var addBookingSuccessCallback = function (data, status) {
                deferred.resolve(status);
            }
            $http.post(url, bookingObj).success(addBookingSuccessCallback).error(errorCallback);
            return deferred.promise;
        },
        //Remove
        removeBooking: function (id) {
            $http.delete(url + '/' + id).success(successCallback).error(errorCallback);
        },
        // Update
        updateBooking: function (bookingObj) {
            var deferred = $q.defer();
            var updateBookingSuccessCallback = function (data, status) {
                deferred.resolve(status);
            }

            $http.put(url, bookingObj).success(updateBookingSuccessCallback).error(errorCallback);
            return deferred.promise;
        }
    }
}]);

rbApp.factory('filterResources', function () {

    return {
        filter: function (resources, bookings) {

            var freeFn = function (resource) {
                var isFree = true;
                bookings.forEach(function (elem, index, array) {
                    isFree = elem.roomTitle == resource ? false : true;
                });
                return isFree
            }
            return resources.filter(freeFn)
        }
    }


});

rbApp.factory('dialogDateTimeFormatter', function () {

    return {
        getDate: function (start) {
            var startDate = new Date(start);
            var year = startDate.getUTCFullYear();
            var month = startDate.getUTCMonth() + 1;
            month = month < 10 ? '0' + month : month;
            var day = startDate.getUTCDate()
            dat = day < 10 ? '0' + day : day;
            


            return year + '-' + month + '-' + day;
        },
        getTime: function (start, end) {
            var startDate = new Date(start);
            var startHours = startDate.getUTCHours();
            startHours = startHours < 10 ? '0' + startHours : startHours;
            var startMinutes = startDate.getUTCMinutes();
            startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes;
            var endDate = new Date(end);
            var endHours = endDate.getUTCHours();
            endHours = endHours < 10 ? '0' + endHours : endHours;
            var endMinutes = endDate.getUTCMinutes();
            endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;
            return startHours + ':' + startMinutes + ' - ' + endHours + ':' + endMinutes;
        }
        

    }
});