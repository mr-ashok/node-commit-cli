#!/usr/bin/env node
var Index;
(function (Index) {
    const commitPrompt = require('./CommitPrompt');
    const figlet = require('figlet');
    const chalk = require('chalk');
    const fs = require('fs');
    const constants = require('./constants');
    const { exec } = require("child_process");
    fs.readFile('./commit-config.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const config = JSON.parse(data);
        const projectName = config['projectName'];
        const commitDescriptionLength = config['commitDescriptionLength'] || 84;
        const rawComponents = config['components'];
        const components = Array.isArray(rawComponents) ? rawComponents : [];
        const issueTracker = config['issueTracker'] || {};
        const issueTrackerName = issueTracker['name'];
        const issueTrackerIdType = issueTracker['idType'] || 'id';
        console.log(chalk.hex('#1a598c')(figlet.textSync(projectName, { horizontalLayout: 'full' })));
        commitPrompt.askQuestion(commitDescriptionLength, components, issueTrackerName, issueTrackerIdType).then((answers) => {
            const rawCommitType = answers[constants.QUESTION_KEY_COMMIT_TYPE] || '';
            const commitType = rawCommitType.substring(0, rawCommitType.indexOf(':'));
            const commitComponent = answers[constants.QUESTION_KEY_COMPONENT];
            const commitDescription = answers[constants.QUESTION_KEY_DESCRIPTION];
            const commitDetails = answers[constants.QUESTION_KEY_COMMIT_MESSAGE];
            const description = `${commitType}(${commitComponent}): ${commitDescription}`.toLowerCase();
            let commitMessage = `${description}\n\n${commitDetails}`;
            if (issueTrackerName) {
                const issueId = answers[constants.QUESTION_KEY_ISSUE_TRACKER_ID];
                commitMessage += `\n${issueTrackerName}: ${issueId}`;
            }
            const command = `git commit -m '${commitMessage}'`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        });
    });
})(Index || (Index = {}));
//# sourceMappingURL=index.js.map