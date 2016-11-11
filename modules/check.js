(function (){
	
	function _check(val){
		this.val = val;
		this.type = null;
		this._false = false;
		return this;
	}
	
	function check(val){
		return new _check(val);
	}
	
	_check.prototype.str = function(){
		if (this._false) {
			return this;
		}
		if (typeof this.val != 'string') {
			this._false = true;
		}
		return this;
	}
	
	_check.prototype.num = function(){
		var floatNum;
		if (this._false) {
			return this;
		}		
		floatNum = parseFloat(this.val);
		if (floatNum != floatNum) {
			this._false = true;
		} 
		return this;
	}
	
	_check.prototype.int = function(){
		var intval, rndval;
		if (this._false) {
			return this;
		}		
		intval = parseInt(this.val);
		rndval = Math.round(intval);
		if (intval != rndval) {
			this._false = true;
		}
		return this;
	}
	
	_check.prototype.min = function(minval){
		var obj = this.num();
		if (obj._false) {
			return obj;
		}	
		if (obj.val < minval) {
			obj._false = true;
		}
		return obj;
	}
	
	_check.prototype.max = function(maxval){
		var obj = this.num();
		if (obj._false) {
			return obj;
		}	
		if (obj.val > maxval) {
			obj._false = true;
		}
		return obj;
	}
	
	_check.prototype.range = function(minval, maxval){
		var obj = this.num();
		if (obj._false) {
			return obj;
		}	
		if ((obj.val < minval) ||  (obj.val > maxval)){
			obj._false = true;
		}
		return obj;
	}
	
	_check.prototype.strlen = function(){
		var obj = this.str();
		if (obj._false) {
			return obj;
		}	
		obj.val = obj.val.length;
		return obj;
	}
	
	_check.prototype.eq = function(val){
		if (this._false) {
			return this;
		}
		if (this.val != val){
			this._false = true;
		}
		return this;
	}
		
	_check.prototype.true = function(){
		return !this._false;
	}
		
	_check.prototype.date = function(){
		var obj = this.str();
		if (obj._false) {
			return obj;
		}
		if ((obj.val.length != 10) ||
				!(1 <= parseInt(obj.val.substr(5, 2)) <= 12) ||
				!(1 <= parseInt(obj.val.substr(5, 2)) <= 31)) {
			obj._false = true;
		}
		return obj;
	}
		
	_check.prototype.datemin = function(date){
		var obj = this.date();
		if (obj._false) {
			return obj;
		}
		if (obj.val < date) {
			obj._false = true;
		}
		return obj;
	}
		
	_check.prototype.datemax = function(date){
		var obj = this.date();
		if (obj._false) {
			return obj;
		}
		if (obj.val > date) {
			obj._false = true;
		}
		return obj;
	}
		
	_check.prototype.datemaxnow = function(){
		var obj = this.date();
		if (obj._false) {
			return obj;
		}
		var now = (new Date()).toJSON().substr(0, 10);
		
		if (obj.val > now) {
			obj._false = true;
		}
		return obj;
	}
		
	// var test = check('').strlen().min(0).true();
	// // console.log(test);
	// // console.log(test.true());
		
// console.log(test)
		
	_modules.add('check', check);
	
	
})();







