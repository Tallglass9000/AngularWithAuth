module.exports = function (app) {
  require('./controllers/beverages_controller')(app);
  require('./directives/beverage_form_directive')(app);
};