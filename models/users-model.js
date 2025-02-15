class Users {
    constructor(data) {
        this.data = data;

        this.userId = data.userId || 0;
        this.firstname = data.firstname || null;
        this.lastname = data.lastname || null;
        this.username = data.username || null;

        this.errors = [];
    }

    //Method
    validation() {

        if (this.data.firstname == null) {
            this.errors.push('Please fill firstname.')
        }
        else if (this.data.lastname == null) {
            this.errors.push('Please fill lastname.')
        }
        else if (this.data.username == null) {
            this.errors.push('Please fill username.')
        }
    }

    register() {
        this.validation();
    }
}

module.exports = Users;