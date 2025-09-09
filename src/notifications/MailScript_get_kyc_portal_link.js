
(function runMailScript(current, template, email, email_action, event) {
  var portalSuffix = gs.getProperty('x_snc_kyc_automati.portal_suffix', 'sp');
  var url = '<a href="' + gs.getProperty('glide.servlet.uri') + portalSuffix + '?id=ticket&table=' + current.getTableName() + '&sys_id=' + current.sys_id + '">Click here to view your application</a>';
  template.print(url);
})(current, template, email, email_action, event);
