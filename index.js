const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [
  {
    type: "input",
    message: "What is your GitHub user name?",
    name: "username",
  },

  {
    type: "input",
    message: "What is your project title?",
    name: "title",
  },
  {
    type: "input",
    message: "Write a short description of your project.",
    name: "description",
  },

  {
    type: "rawList",
    message: "What would you like in your table of contents?",
    name: "contents",
  },

  {
    type: "input",
    message: "What are the steps required to install your project?",
    name: "installation",
  },

  {
    type: "input",
    message: "Provide instructions and examples for use.",
    name: "usage",
  },

  {
    type: "input",
    message: "Input licensing information:",
    name: "license",
  },

  {
    type: "input",
    message: "Are there any contributors?",
    name: "contributors",
  },

  {
    type: "input",
    message: "Include any tests:",
    name: "tests",
  },
];

function init() {
  //use inquirer on our array
  inquirer
    .prompt(questions)
    .then((response) => {
      const answers = { ...response };
      axios
        .get("https://api.github.com/users/" + answers.username)
        .then((response) => {
          image = response.data.avatar_url;
          userEmail = response.data.email;
          console.log(image);
          console.log(userEmail);
        });

      function writeToFile(fileName, answers) {
        fs.appendFile("README.md", JSON.stringify(answers), null, 2, (err) =>
          console.log(err)
        );
      }

      writeToFile();
    })

    .catch(function (error) {
      console.error(error);
    });
}

init();
