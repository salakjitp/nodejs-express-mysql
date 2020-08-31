class Users {

    constructor(data) {
        this.data = data;

        this.firstname = data.firstname || null;
        this.lastname = data.lastname || null;
        this.nickname = data.nickname || null;

        this.errors = [];
    }
 
    //Getter
    get fullName(){
        return this.firstname +' '+ this.lastname
    }

    //Method
    validation() {

        if(this.data.firstname == null){
            this.errors.push('Please fill firstname.')
        }
        else  if(this.data.lastname == null){
            this.errors.push('Please fill lastname.')
        }
        else if(this.data.nickname == null){
            this.errors.push('Please fill nickname.')
        }
    }
 
    register() {
       this.validation();
    }
 } 

module.exports = Users;