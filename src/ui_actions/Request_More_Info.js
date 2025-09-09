var kycApp = current.kyc_app.getRefRecord();
kycApp.setValue('status', 'awaiting_info');
kycApp.work_notes = "Additional information requested by " + gs.getUserDisplayName();
kycApp.update();

gs.eventQueue('x_snc_kyc_automati.awaiting_info', kycApp, gs.getUserID(), '');

current.state = 4; // 4 = Closed Incomplete
current.update();

action.setRedirectURL(kycApp);
