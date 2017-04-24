const assert = require('assert')
const chai = require('chai')

function validateSearch(business, zipcode) {
    	if(business.length == 0) {
    		return false;
    	} else if(zipcode.length == 0) {
    		return false;
    	} else {
    		return true;
    	}
    }



describe('BusinessSearchService', () => {
  describe('#validateSearch()', () => {
    it('should not allow empty business name or empty zip code', () => {
      chai.expect(validateSearch('', '48226')).to.equal(false)
      chai.expect(validateSearch('Waymark', '')).to.equal(false)
      chai.expect(validateSearch('Waymark', '48226')).to.equal(true)
    })
  })
})