(function(vaInputs) {
    var taskFilter = vaInputs.task_type_filter;
    var htmlResponse = '';
    var userGroups = [];

    var groupMemberGr = new GlideRecord('sys_user_grmember');
    groupMemberGr.addQuery('user', vaInputs.user.sys_id);
    groupMemberGr.query();
    while (groupMemberGr.next()) {
        userGroups.push(groupMemberGr.getValue('group'));
    }

    if (userGroups.length === 0) {
        return "I couldn't find any tasks because your user account is not a member of any assignment groups.";
    }

    var taskGr = new GlideRecord('x_snc_kyc_automati_kyc_task');
    taskGr.addQuery('assignment_group', 'IN', userGroups.join(','));
    taskGr.addQuery('state', 'IN', '1,2');

    if (taskFilter == 'High-Risk Tasks') {
        taskGr.addQuery('kyc_app.risk_level', 'High');
    } else if (taskFilter == 'Tasks Breaching SLA Soon') {
        taskGr.addQuery('due_date', '<=', gs.daysAgoStart(-1));
    }
    
    taskGr.setLimit(5);
    taskGr.query();

    if (!taskGr.hasNext()) {
        return "Good news! There are no tasks that match your criteria.";
    }

    htmlResponse = "Here are the urgent tasks I found:<ul>";
    while (taskGr.next()) {
        var taskURL = gs.getProperty('glide.servlet.uri') + 'nav_to.do?uri=x_snc_kyc_automati_kyc_task.do?sys_id=' + taskGr.getValue('sys_id');
        htmlResponse += '<li><a href="' + taskURL + '" target="_blank">' + taskGr.getDisplayValue('number') + '</a>: ' + taskGr.getDisplayValue('short_description') + '</li>';
    }
    htmlResponse += "</ul>";

    return htmlResponse;
})(vaInputs);
