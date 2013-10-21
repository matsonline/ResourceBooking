rbApp.directive('rbSlider', ['$compile', function ($compile) {

    var config = {
        min: 480,
        max: 1020,
        step: 15,
        value: [480, 480],
        tooltip: 'hide'
    }

    var calculate = function (value) {
        var hours = Math.floor(value / 60);
        var mins = (value - hours * 60);
        return (hours < 10 ? "0" + hours : hours) + ":" + (mins == 0 ? "00" : mins);
    };

    return {
        restrict: 'A',
        link: function (scope, elem, attr) {

            elem.slider(config).on('slide', function (ev) {

                console.log("left slide: " + calculate(ev.value[0]));
                scope.slider.left = calculate(ev.value[0]);
                scope.slider.right = calculate(ev.value[1]);
                scope.$apply();
            }
        )
        }
    }
}]);

rbApp.directive('rbSliderDate', ['$compile', function ($compile) {

    var nowDate = new Date();
    var nowString = nowDate.toDateString()
    //var todayString = nowString + " " + "02:00";
    var todayDate = new Date(nowString)
    var todayms = todayDate.getTime();

    var config = {
        min: todayms,
        max: todayms + (90 * 24 * 60 * 60 * 1000), // iadg + 90 dagar
        step: 24 * 60 * 60 * 1000,
        value: todayms + (24 * 60 * 60 * 1000),
        tooltip: 'hide'
    }

    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    var getWeekday = function (weekdaynr) {

        switch (weekdaynr) {
            case 0:
                return "Söndag"
                break;
            case 1:
                return "Måndag"
                break;
            case 2:
                return "Tisdag"
                break;
            case 3:
                return "Onsdag"
                break;
            case 4:
                return "Torsdag"
                break;
            case 5:
                return "Fredag"
                break;
            case 6:
                return "Lördag"
                break;

            default:
                return "Error"
                break;
        }

    }

   var calculate = function (value) {
       var cDate = new Date(value);
       var year = cDate.getUTCFullYear();
       var month = cDate.getUTCMonth() + 1;
       month = month < 10 ? '0' + month : month;
       var date = cDate.getUTCDate()
       date = date < 10 ? '0' + date : date;
       var cDateString = cDate.toLocaleDateString();
       var weeknr = cDate.getWeek();
       var day = getWeekday(cDate.getUTCDay());
       var cDateString = year + '-' + month + '-' + date;

       var sliderDateObject = {
           datestring: cDateString,
           dayofweek: day,
           weeknumber: weeknr,
           dayofweek: day,
           weeknumber: weeknr
       }

       return sliderDateObject;
       
   };




    return {
        restrict: 'A',
        link: function (scope, elem, attr) {

            elem.slider(config).on('slide', function (ev) {
                scope.sliderDateObject = calculate(ev.value)
                scope.$apply();
            }
        )
        }
    }
}]);



