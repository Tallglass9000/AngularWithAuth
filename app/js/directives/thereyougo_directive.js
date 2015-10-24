module.exports = function (app) {
  app.directive('thereyougo', function () {
    return {
      restrict: 'AC',
      templateUrl: '/templates/directives/thereyougo_directive_template.html',
      transclude: true,
      scope: {
        title: '@'
      },
      controller: function ($scope) {
        $scope.description = 'there you go';
      }
    }
  });
};