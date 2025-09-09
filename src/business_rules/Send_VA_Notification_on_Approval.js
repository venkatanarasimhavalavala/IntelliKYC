(function executeRule(current, previous) {
    var userId = current.getValue('customer');
    var appNumber = current.getValue('number');
    var message = 'Hi! Great news, your KYC application ' + appNumber + ' has just been approved.';
    
    try {
        new sn_va_as_service.VAService().sendVirtualAgentMessage('text', userId, message);
    } catch (e) {
        gs.error("Failed to send VA notification for KYC approval. Error: " + e);
    }

})(current, previous);
