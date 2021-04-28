# Commit CLI

## Why Commit CLI

- Commit CLI is a tool which allows you to write your commit message in [Conventional commit message format](https://www.conventionalcommits.org/en/v1.0.0/).
- The conventional commit message follows following format:
```
<type>[scope]: <description>

[body]

[footer(s)]
```
- In this commit message format, the dev specify the **type** ("fix", "feature", etc.), **scope** (affected component of your project), **commit description**, **commit body** and some footers (task url, whether it is breaking changes, PR link, etc.).
- This type of commit messages are both human and machine readable.
- With this type of messages, it becomes very easy to generate the CHANGELOG with consolidating all the fixes and features.
- Commit CLI helps you to write this types of messages by asking the dev certain questions and accordingly create a commit message and perform the commit.
- You might think that there are many tools out there like [Commitizen](https://commitizen-tools.github.io/commitizen/), so why should you use this tool?
- Well the answer is existing tools are great and they works like charm, but they are either very hard to use or they would need a lot of plugins and configuration to make them work.
- The existing tools does provide a select list for the **type** ("fix", "feature", etc.), but they do not provide the select list for **scope** (affected component of your project). So incase you have a team working on a project with limited set of components/scope, then all of your team member would need to remember the scope names.
- As we all know how reliable the human memory is, there are greate chances that many dev would forget or would get confuse between the scope names (E.g. for an company internal project, the scope is `h.r.` or `hr`. Also, the scope is `admin` or `administrator`). This kind of issues causes many minor review comments to update commit message. Also, it also put a responsibility on the reviewer to review the commit message for correctness.
- The existing library provides the solution for this, but it is provided as a plugin. Also, to specify your JIRA/trello task url, you would also need some additional plugins.
- As the number of plugins grow, the number of configuration files just for the sake of formatted commit message.
- Also, in case you are switching from one task manager to another task manager (like from JIRA to Trello or vice versa), you would need to search for the right plugin for you app again.
- So, the proble with existing solutions are they are heavy, they need a lot of research for plugins to make them work for you and they are very hard to maintain and update as per your requirement.
- This was the inspiration for this project, a light weight tool which can be customized as per the user needs.
- This tool just read a single configuration file and would format and work accordingly.
- It just asks few questions and takes those answers to generate the commit message. Afterwhich, it just perform the traditional git commit command with the commit message.

----

## How to use this tool:

- Add `commit-config.json` file at the root directory of project.
- Add `commit:"commit-cli"` in script of package.json file.
- Now just git add your files and run `npm run commit`.

----

## Configuration file:

- projectName

  - Type: String
  - Description: Name of the project displayed while running the CLI tool
  - Default: NA

- components

  - Type: Array<String>
  - Description:
    - List of components present in the project.
    - Will display the list containing these components while providing the details of commit.
    - In case this value is not present, or the value is empty, then you would need to enter the component value manually.
  - Default: Empty (undefined)

- commitDescriptionLength

  - Type: Number
  - Description: Maximum number of characters for commit description
  - Default: 84

- issueTracker

  - Type:
    ```metadata json
    {
      "name": String,
      "idType": String
    }
    ```
  - Description: Details of issue tracker service like JIRA,Trello, etc.
  - Default: Empty (undefined)

- issueTracker.name

  - Type: String
  - Description: Name of issue tracker service like JIRA,Trello, etc.
  - Default: Empty (undefined)

- issueTracker.idType
  - Type: String
  - Description: Type of id for issue tracker service like Id for JIRA, Card URL for Trello, etc.
  - Default: 'id'


Example:
```json
{
    "projectName": "API Architecure",
    "components": [
    	"analytics",
    	"db",
    	"service"
    ],
    "issueTracker": {
        "name": "JIRA",
        "idType": "task url"
    }
}

```
