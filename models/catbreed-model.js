class CatBreed {

    constructor(data) {
        this.data = data;

        this.breedname = data.breedname || null;
        this.coatDescription = data.coatDescription || null;
        this.description = data.description || null;
        this.typeId = data.typeId || null;
        this.othertype = data.othertype || null;
        this.bodyTypeId = data.bodyTypeId || null;
        this.otherbodytype = data.otherbodytype || null;
        this.location = data.location || null;
        
        this.errors = [];
    }

    //Method
    validation() {

        if(this.data.breedname == null){
            this.errors.push('Please fill breedname.')
        }
        else  if(this.data.typeId == null){
            this.errors.push('Please fill typeId.')
        }
        else if(this.data.bodyTypeId == null){
            this.errors.push('Please fill bodyTypeId.')
        }
    }
 
    register() {
       this.validation();
    }
 } 

module.exports = CatBreed;