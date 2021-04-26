namespace Index {
    const commitPrompt = require('./CommitPrompt');
    const figlet = require('figlet');
    const chalk = require('chalk');
    const fs = require('fs');
    const constants = require('./constants');
    const { exec } = require("child_process");

    fs.readFile('./commit-config.json', 'utf8', (err: any, data:string) => {
        if (err) {
            throw err;
        }
        const config = JSON.parse(data);
        const projectName: string = config['projectName'];
        const commitDescriptionLength: number = config['commitDescriptionLength'] || 84;
        const rawComponents = config['components'];
        const components: string[] = Array.isArray(rawComponents) ? rawComponents : [];

        const issueTracker = config['issueTracker'] || {};
        const issueTrackerName: string = issueTracker['name'];
        const issueTrackerIdType: string = issueTracker['idType'] || 'id';

        console.log(chalk.hex('#1a598c')(figlet.textSync(projectName, {horizontalLayout: 'full'})));

        commitPrompt.askQuestion(commitDescriptionLength, components, issueTrackerName, issueTrackerIdType).then((answers: any) => {
            const rawCommitType: string = answers[constants.QUESTION_KEY_COMMIT_TYPE] || '';
            const commitType = rawCommitType.substring(0, rawCommitType.indexOf(':'));

            const commitComponent: string = answers[constants.QUESTION_KEY_COMPONENT];
            const commitDescription: string = answers[constants.QUESTION_KEY_DESCRIPTION];
            const commitDetails: string = answers[constants.QUESTION_KEY_COMMIT_MESSAGE];

            const description = `${commitType}(${commitComponent}): ${commitDescription}`.toLowerCase();
            let commitMessage = `${description}\n\n${commitDetails}`;
            if (issueTrackerName) {
                const issueId: string =  answers[constants.QUESTION_KEY_ISSUE_TRACKER_ID];
                commitMessage += `\n${issueTrackerName}: ${issueId}`;
            }

            const command = `git commit -m '${commitMessage}'`;
            exec(command, (error: { message: any; }, stdout: any, stderr: any) => {
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

}