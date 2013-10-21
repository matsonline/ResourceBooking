rbApp.filter('freeResources', function () {

    return function (resource) {
        
        return resource == "Samlingssalen" ? null : resource;

    }
});

