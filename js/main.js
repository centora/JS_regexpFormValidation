(function(){  // Розбить функцию checkValidation на мелкие функции: отдельно проверка на числа, отдельно проверка на буквы.

    function simpleValidation(form) {

		form.onsubmit = function(){
			var _inputs = form.getElementsByTagName('input');
            for(var i = 0; i < _inputs.length; i++){
            	checkValidation(_inputs[i]);

            	if(!document.getElementsByClassName('error').length){
            		alert("Form has been sent successfully!");
            	}
            }
		}

    }
	
	function checkValidation(elem){

        var ageReg = /^\d{1,3}$/;

        var nameReg = /^[A-z 0-9]{3,50}$/;
        var errorDiv = document.createElement('div');
        addClass(errorDiv, "error-msg");
        errorDiv.innerHTML = "Invalid value.";        
        var elemHold = elem.parentNode;

        //Check name
        if(elem.id == "first-name"){
            if(elem.value != "" && nameReg.test(elem.value)){
                addClass(elem, "valid");
                removeClass(elem, "error");
                if(elemHold.getElementsByClassName('error-msg').length){
                    elemHold.removeChild(elemHold.getElementsByClassName('error-msg')[0]);
                }
                return;
            }
            removeClass(elem, "valid");
            addClass(elem, "error");
            if(!elemHold.getElementsByClassName('error-msg').length){
                elemHold.appendChild(errorDiv);
                errorDiv.innerHTML += " The name should contains only letters and numbers."
            }
            
        }

        //Check age
        if(elem.id == "age"){
            if(elem.value != "" && ageReg.test(elem.value) && elem.value >= 6 && elem.value <= 100){
                removeClass(elem, "error");
                addClass(elem, "valid");
                if(elemHold.getElementsByClassName('error-msg').length){
                    elemHold.removeChild(elemHold.getElementsByClassName('error-msg')[0]);
                }
                return;
            }
            removeClass(elem, "valid");
            addClass(elem, "error");
            if(!elemHold.getElementsByClassName('error-msg').length){
                elemHold.appendChild(errorDiv);
                errorDiv.innerHTML += " The age should contains only number from 6 to 100."
            }
        }


	}

	function addClass(_elem, _class){
        var classes;

        if(!_elem.classList){
            classes = _elem.classList.add(_class);
        }else{
            if(!_elem.className.length){
               classes = _elem.className = _class;
               return;
            }

            if(!hasClass(_elem, _class)){
               classes = _elem.className +=  " " + _class;
            }
        }

		return classes;
	}

    function toggleClass(_elem, _class){
        var classes;
        if(!hasClass(_elem, _class)){
           classes = addClass(_elem, _class);
        }else{
            classes = removeClass(_elem, _class);
        }
        return classes;
    }

    function hasClass(_elem, _class){
        if(_elem.className.length && _elem.className.indexOf(_class) > -1){
            return true;
        }
        return false;                

    }

	function removeClass(_elem, _class){
        if(_elem.classList){
            classes = _elem.classList.remove(_class);
        }else{
            if(_elem.className.length){
                classes = _elem.className = _elem.className.replace(_class, "").replace(/^\s+|\s+$/g, "");
            }
        }
		return classes;
	}

	simpleValidation(document.getElementById("form"));

})();