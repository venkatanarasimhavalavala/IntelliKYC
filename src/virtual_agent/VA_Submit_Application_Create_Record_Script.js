
(function(vaInputs, vaVars) {
    var kycGr = new GlideRecord('x_snc_kyc_automati_kyc_application');
    kycGr.initialize();
    kycGr.setValue('customer', vaInputs.user.sys_id);
    kycGr.setValue('applicant_type', vaInputs.applicant_type);
    kycGr.setValue('pan', vaInputs.pan);
    kycGr.setValue('aadhaar', vaInputs.aadhaar);
    kycGr.setValue('account_type', vaInputs.account_type);
    kycGr.setValue('pep_flag', vaInputs.pep_flag);
    if (vaInputs.applicant_type == 'Individual') {
        kycGr.setValue('declared_income_level', vaInputs.income_level);
    } else {
        kycGr.setValue('industry', vaInputs.industry);
    }
    kycGr.setValue('status', 'submitted');
    var recordSysId = kycGr.insert();
    var recordNumber = kycGr.getValue('number');

    vaVars.new_kyc_number = recordNumber;
    vaVars.new_kyc_sysid = recordSysId;
})(vaInputs, vaVars);
