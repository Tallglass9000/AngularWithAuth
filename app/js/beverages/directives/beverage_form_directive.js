module.exports = function (app) {
  app.directive('beverageForm', function () {
    return {
      restrict: 'AC', 
      replace: true,
      templateUrl: '/templates/beverages/directives/beverage_form_template.html',
      scope: {
        labelText: '@', 
        buttonText: '@', 
        note: '=',
        save: '&'
      },
      controller: function ($scope) {
        console.log($scope.save);
      }
    }
  });
};