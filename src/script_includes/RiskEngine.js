
var RiskEngine = Class.create();
RiskEngine.prototype = {
  initialize: function() {},

  score: function(app) {
    var s = 0;
    var breakdown = {};

    function add(key, value) {
      s += value;
      breakdown[key] = value;
    }

    add('base', 10);
    if (app.applicant_type == 'corporate') {
      add('corporate_applicant', 10);
    }
    if (app.pep_flag == true) {
      add('pep_flag', 50);
    }
    var highRiskCountries = ['HighRiskCountry1', 'HighRiskCountry2'];
    if (highRiskCountries.indexOf(app.country.getDisplayValue()) > -1) {
      add('high_risk_country', 20);
    }
    if (app.declared_income_level == '>100K') {
        add('high_income', 5);
    }

    var band = 'Low';
    if (s >= 60) {
      band = 'High';
    } else if (s >= 30) {
      band = 'Medium';
    }

    return {
      score: s,
      band: band,
      breakdown: JSON.stringify(breakdown)
    };
  },

  type: 'RiskEngine'
};
