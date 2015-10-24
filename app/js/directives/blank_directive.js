module.exports = function (app) {
  app.directive('blankDirective', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/blank_directive_template.html',
      scope: {
        foo: '=',
        bar: '@',
        greeting: '@'
      },
      controller: function ($scope) {
        $scope.greeting = $scope.greeting || 'Hey there, blank, super cool, magic unicorns, there you go.';
      }
    };
  });
};