const Employee = require(`./Employee`)

// Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email, `Manager`)
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;