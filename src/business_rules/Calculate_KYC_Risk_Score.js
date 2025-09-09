(function executeRule(current, previous) {
  var riskResult = new x_snc_kyc_automati.RiskEngine().score(current);

  current.risk_score = riskResult.score;
  current.risk_level = riskResult.band;

  var audit = new GlideRecord('x_snc_kyc_automati_risk_audit');
  audit.initialize();
  audit.kyc_app = current.getUniqueValue();
  audit.score_breakdown = riskResult.breakdown;
  audit.final_band = riskResult.band;
  audit.calculated_on = new GlideDateTime();
  audit.insert();

})(current, previous);
