// linked "packages"
const inquirer = require(`inquirer`);
const fs = require(`fs`);

// linked other js files
const Employee = require(`./Employee`);
const Engineer = require(`./Engineer`);
const Intern = require(`./Intern`);
const Manager = require(`./Manager`);
const generateHTML = require(`./generateHtml`);
const internal = require("stream");

const team = [];

const manager = () => {
    inquirer.prompt([
        {
            type: `input`,
            name: `managerName`,
            message: `What is the team manager's name?`
        },
        {
            type: `input`,
            name: `managerId`,
            message: `What is the team manager's ID number?`
        },
        {
            type: `input`,
            name: `managerEmail`,
            message: `What is the team manager's email?`
        },
        {
            type: `input`,
            name: `managerOfficeNumber`,
            message: `What is the team manager's office number?`
        }
    ]).then((answers)=> {
        const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        team.push(manager);
        buildTeam();
    })
}

const buildTeam = () => {
    inquirer.prompt([
        {
            type: `list`,
            name: `buildTeam`,
            message: `Who do you want to add to your team?`,
            choices: [`Engineer`,`Intern`,`Quit`]
        }
    ]).then((answers)=> {
        if (answers.buildTeam === `Engineer`) {
            engineer();
        } else if (answers.buildTeam === `Intern`) {
            intern();
        } else {
            fs.writeFile(`index.html`, generateHTML(team), err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`HTML file generated!`);
                }
            });
        }
    });
}

const engineer = () => {
    inquirer.prompt([
        {
            type: `input`,
            name: `engineerName`,
            message: `What is this engineer's name?`
        },
        {
            type: `input`,
            name:  `engineerId`,
            message: `What is this engineer's employee ID?`
        },
        {
            type: `input`,
            name: `engineerEmail`,
            message: `What is this engineer's email?`
        },
        {
            type: `input`,
            name: `engineerGithub`,
            message: `What is this engineer's Github username?`
        }
    ]).then((answers)=>{
        const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        team.push(engineer);
        buildTeam();
    })
}

const intern = () => {
    inquirer.prompt([
        {
            type: `input`,
            name: `internName`,
            message: `What is this intern's name?`
        },
        {
            type: `input`,
            name: `internId`,
            message: `What is this intern's employee ID?`
        },
        {
            type: `input`,
            name: `internEmail`,
            message: `What is this intern's email?`
        },
        {
            type: `input`,
            name: `internSchool`,
            message: `Where did this intern go to school?`
        }
    ]).then((answers)=> {
        const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        team.push(intern);
        buildTeam();
    })
}

manager();