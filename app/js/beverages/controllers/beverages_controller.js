module.exports = function (app) {
  app.controller('BeveragesController', ['$scope', 'Resource', '$http', '$cookies', '$location', function ($scope, Resource, $http, $cookies, $location) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.beverages = [];
    $scope.newBeverage = {};
    var beverageResource = Resource('beverages');
    $scope.description = 'App description';

    $scope.printDescription = function (description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function () {
      beverageResource.getAll(function (err, data) {
        if (err) return console.log(err);
        $scope.beverages = data;
      });
    };

    $scope.createBeverage = function (beverage) {
      beverageResource.create(beverage, function (err, data) {
        if (err) return console.log(err);
        $scope.newBeverage = {};
        $scope.beverages.push(data);
      });
    };

    $scope.updateBeverage = function (beverage) {
      beverageResource.update(beverage, function (err) {
        beverage.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.removeBeverage = function (beverage) {

      beverageResource.remove(beverage, function (err) {
        if (err) return console.log(err);
        $scope.beverages.splice($scope.beverages.indexOf(beverage), 1);
      });
    };
  }]);
};