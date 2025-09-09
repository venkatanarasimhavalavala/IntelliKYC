(function runMailScript(current, template, email, email_action, event) {
  var url = '<a href="' + gs.getProperty('glide.servlet.uri') + 'nav_to.do?uri=' + current.getTableName() + '.do?sys_id=' + current.sys_id + '">Click here to open the task</a>';
  template.print(url);
})(current, template, email, email_action, event);
