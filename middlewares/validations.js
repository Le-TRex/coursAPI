const Producer = require('../models').Producer;
const Genre = require('../models').Genre;
class validations {

    /*
    * VALIDATE NAME
     */
    async checkName(name){
        let regex = new RegExp(/[a-zA-Z-'`]{2,50}/g) 
        return regex.test(name)   
    }

    async checkLength(name, min, max){
        if(name.length >= min && name.length <= max){
            return true
        }else{
            return false
        } 
    }

    /*
    * VALIDATE YEAR
     */
    async checkYear(year){
        let regex = new RegExp(/\b(19|20)\d\d\b/g) 
        return regex.test(year) ? true : false
    }

    /*
    * MAKE PRODUCERID MANDATORY
     */
    async checkProducerId(id){
        return Producer.findByPk(id)
    }

    /*
    * MAKE GENDREID MANDATORY
     */
    async checkGenreId(id){
        return Genre.findByPk(id)
    }
}

module.exports = new validations();
