# Commit CLI

---

Setup:

- Add `commit-config.json` file at the root directory of project.
- Add `commit:"commit-cli"` in script of package.json file.

---

Configuration file:

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
