var CommitPrompt;
(function (CommitPrompt) {
    const inquirer = require('inquirer');
    const chalk = require('chalk');
    const constants = require('./constants');
    const getQuestionData = (commitDescriptionLength, components, issueTrackerName, issueTrackerIdType) => {
        const questions = [{
                name: constants.QUESTION_KEY_COMMIT_TYPE,
                type: 'list',
                message: `Select the type of change that you're committing`,
                choices: [
                    `feat:        A new feature`,
                    `fix:         A bug fix`,
                    `improvement: An improvement to a current feature`,
                    `docs:        Documentation only changes`,
                    `style:       Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)`,
                    `refactor:    A code change that neither fixes a bug nor adds a feature`,
                    `perf:        A code change that improves performance`,
                    `test:        Adding missing tests or correcting existing tests`,
                    `build:       Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)`,
                    `ci:          Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)`,
                    `chore:       Other changes that don't modify src or test files`,
                    `revert:      Reverts a previous commit`
                ]
            }, {
                name: constants.QUESTION_KEY_COMPONENT,
                message: `What is the scope of this change (e.g. component or file name):`,
                type: components.length > 0 ? 'list' : 'input',
                choices: components,
                validate: function (input) {
                    return String(input).length !== 0
                        ? true
                        : `Please enter a valid component.`;
                }
            }, {
                name: constants.QUESTION_KEY_DESCRIPTION,
                message: `Write a short, imperative tense description of the change (max ${commitDescriptionLength} chars):\n`,
                type: 'input',
                transformer: (value = '', flags) => {
                    const percent = value.length / commitDescriptionLength * 100;
                    const color = percent < 80 ? chalk.green : percent > 100
                        ? chalk.red
                        : chalk.yellow;
                    return color(`(${value.length}) ${value}`);
                },
                validate: function (input) {
                    return String(input).length < 94
                        ? true
                        : `Please enter description less than 94 chars`;
                }
            }, {
                name: constants.QUESTION_KEY_COMMIT_MESSAGE,
                message: `Provide a longer description of the change:`,
                type: 'editor',
                validate: function (input) {
                    return String(input).length !== 0
                        ? true
                        : `Please enter a longer description.`;
                }
            }];
        if (issueTrackerName) {
            questions.push({
                name: constants.QUESTION_KEY_ISSUE_TRACKER_ID,
                message: `Enter ${issueTrackerName} ${issueTrackerIdType}:`,
                type: 'input',
                validate: function (input) {
                    return String(input).length !== 0
                        ? true
                        : `Please enter a valid issue tracker Id.`;
                }
            });
        }
        return questions;
    };
    const askQuestion = (commitDescriptionLength, components, issueTrackerName, issueTrackerIdType) => inquirer.prompt(getQuestionData(commitDescriptionLength, components, issueTrackerName, issueTrackerIdType));
    module.exports = { askQuestion };
})(CommitPrompt || (CommitPrompt = {}));
//# sourceMappingURL=CommitPrompt.js.map