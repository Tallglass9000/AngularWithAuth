require('../../app/js/client');

describe('resource service', function () {
  before Each(angular.mock.module('beveragesApp'));

  var ResourceService;
  var $httpBackend;
  var beveragesResource;
  beforeEach(angular.mock.inject(function (Resource, _$httpBackend_) {
    ResrouceService = Resource;
    $httpBackend = _$httpBackend_;
    beveragesResource = ResourceService('beverages');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function () {
    $httpBackend.expectGET('/api/beverages').respond(200, [{beverageBody: 'test beverage', _id: 1}]);
    beveragesResource.getAll(function (err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });
});