/*
(function(){


    angular
        .module("Eportfolio.Controllers", [])
        .controller("registerCtrl", registerCtrl);


    registerCtrl.$inject = ["$scope"];

    function registerCtrl($scope) {
        const scope = $scope;
        const vm = this;

        console.log("scope: ", scope);
        console.log("vm: ", vm);

        console.log("RegisterCtrl");

        vm.indexCount = 0;

        /!**
         * @name previousSteps
         * @function
         *!/
        vm.previousSteps = function() {
            --vm.indexCount;
        };

        /!**
         * @name nextSteps
         * @function
         *!/
        vm.nextSteps = function() {
            ++vm.indexCount;
        };

        /!**
         * @name disabledPrevBtn
         * @function
         *
         * @return {boolean}
         *!/
        vm.disabledPrevBtn = function() {
            if(vm.indexCount === 0) {
                return true;
            }
        };

        /!**
         * @name hideNextBtn
         * @function
         *
         * @return {boolean}
         *!/
        vm.hideNextBtn = function() {
          if(vm.indexCount === 2) {
              return true;
          }
        };

        /!**
         * @name showRegisterBtn
         * @function
         *
         * @return {string}
         *!/
        vm.showRegisterBtn = function() {
            if(vm.indexCount === 2) {
                return "showing";
            }
        };

        /!**
         * @name registerBtn
         * @function
         *!/
        vm.registerBtn = function() {};
    }
})();
*/

/**
 * @name setAttributes
 * @function
 *
 * @param el
 * @param obj
 */
function setAttributes(el, obj) {
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            el.setAttribute(key, obj[key]);
        }
    }
}

/**
 * @name getIndex
 * @function
 *
 * @param node
 * @return {number}
 */
function getIndex(node) {
    let childElem = node.parentNode.childNodes,
        i = 0;

    for (i; i < childElem.length; i++) {
        if (node === childElem[i]) {
            break;
        }
    }

    return i;
}

/**
 * @name selectInit
 * @function
 *
 * @param elem
 */
function selectInit(elem) {
    elem.forEach(function(item) {
        let self            = item,
            optArr          = self.children,
            selectWrap      = self.closest(".form__select"),
            input           = self.nextElementSibling;


        let ulList = document.createElement("ul");
        ulList.setAttribute("class", "form__select-option");


        for(let i = 0; i < optArr.length; i++) {
            let liItem = document.createElement("li");

            setAttributes(liItem, {
                "class" : "form__select-item"
            });

            liItem.innerText = optArr[i].value;

            liItem.addEventListener("click", function(ev) {
                let itemVal = ev.target.innerText,
                    idx = getIndex(ev.target);

                let optionSelect = self.getElementsByTagName("option"),
                    optionSelectCurrent = optionSelect[idx];

                let event = new Event("change");

                for(let j = 0; j < optionSelect.length; j++) {
                    optionSelect[j].removeAttribute("selected");
                }

                optionSelectCurrent.setAttribute("selected", true);
                self.dispatchEvent(event);

                input.setAttribute("value", itemVal);
                ulList.removeAttribute("style");
            });

            ulList.appendChild(liItem);
        }

        selectWrap.appendChild(ulList);

        input.addEventListener("click", function(ev) {
            const self                  = ev.target,
                winHeight               = window.innerHeight,
                rect                    = self.getBoundingClientRect(),
                dropContainerAll        = document.querySelectorAll(".form__select-option"),
                dropContainerCurrent    = self.nextElementSibling;


            let top     = rect.top + rect.height,
                bottom  = winHeight - rect.bottom + rect.height,
                left    = rect.left,
                width   = rect.width;


            let freeSpace               = winHeight - rect.bottom,
                maxHeightBlockTop       = winHeight - rect.bottom,
                maxHeightBlockBottom    = rect.top;


            let positionObj = "";


            if (freeSpace > 100) {
                positionObj = "top:" + top + "px;max-height:" + maxHeightBlockTop + "px;";
            } else {
                positionObj = "bottom:" + bottom + "px;max-height:" + maxHeightBlockBottom + "px;";
            }


            let objStyle = "display:block;left:" + left + "px; width:" + width + "px;" + positionObj;


            dropContainerAll.forEach(function(item) {
                item.removeAttribute("style");
            });
            setAttributes(dropContainerCurrent, {
                "style" : objStyle
            })
        });
    });
}


let validateForm = {
    steps: {
        "0" : {},
        "1" : {},
        "2" : {}
    },
    fields: {
        "first_name" : {
            event : "blur",
            method  : "textValidation"
        },
        "surname" : {
            event : "blur",
            method  : "textValidation"
        },
        "title" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "gender" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "type_of_institution" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "speciality" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "level_of_training" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "hospital" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "school" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "country" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "language" : {
            event : "change",
            method  : "notEmptyValidation"
        },
        "email" : {
            event : "blur",
            method  : "emailValidation"
        },
        "create_password" : {
            event : "blur",
            method  : "passwordValidation"
        },
        "confirm_password" : {
            event : "blur",
            method  : "passwordValidation"
        }
    },
    pattern : {
        text: "^[a-z\.0-9 ]+$",
        email: "^[a-z0-9]+[a-z0-9'._%+\\-]*[a-z0-9]*\\@(?:[a-z0-9]+(?:-[a-z0-9]+)*\\.)+[a-z]{2,}$"
    },
    patternText: function(str) {
        let reg = new RegExp(this.pattern.text, "gi");

        return reg.test(str);
    },
    patternEmail: function(str) {
        let reg = new RegExp(this.pattern.email, "gi");

        return reg.test(str);
    },
    init: function() {},
    setEventOnDataChange: function(event1, event2) {
        let arrBlur = this.getFieldsNameArr(event1)[0],
            arrChange = this.getFieldsNameArr(event1)[1];

            this.renderEvent(arrBlur, event1);
            this.renderEvent(arrChange, event2);
    },
    renderEvent: function(arr, event) {
        arr.map(function(elem) {
            document.getElementsByName(elem).forEach(function(item) {
                item.addEventListener(event, function() {
                    validateForm.validateField(this);
                });
            });
        });
    },
    getFieldsNameArr: function(event) {
        let arrBlur = [],
            arrChange = [];

        for(let name in this.fields) {
            if (this.fields.hasOwnProperty(name)) {
                if(this.fields[name].event === event) {
                    arrBlur.push(name);
                } else {
                    arrChange.push(name);
                }
            }
        }

        return [arrBlur, arrChange];
    },
    validateField: function(self) {
        let nameElem    = self.name;

        console.log("{\"" + self.name + "\" : \"" + self.value + "\"}");

        for(let fieldsName in this.fields[nameElem]) {
            if(this.fields[nameElem].hasOwnProperty(fieldsName)) {
                this[this.fields[nameElem]["method"]](self);
            }
        }
    },
    textValidation: function(self) {
        let val = self.value;

        if(val.length < 3 || !this.patternText(val)) {
            return this.displayError(self);
        }

        return this.displayDone(self);
    },
    notEmptyValidation: function(self) {
        let val = self.value.toLowerCase();

        if(val.length === 0) {
            return this.displayError(self);
        }

        this.selectingDisplayArea(self);

        return this.displayDone(self);
    },
    emailValidation: function(self) {
        let val = self.value;

        if(this.patternEmail(val)) {
            return this.displayDone(self);
        }

        return this.displayError(self);
    },
    passwordValidation: function(self) {
        let val = self.value;

        if(val.length < 6) {
            return this.displayError(self);
        }

        if(self.name === "confirm_password") {
            let valCreatePass = document.getElementsByName("create_password")[0].value;

            if(val.length < 6 || (valCreatePass !== val)) {
                return this.displayError(self);
            }
        }

        return this.displayDone(self);
    },
    displayError: function(self) {
        let parentElement = self.closest(".form__group");

        parentElement.classList.remove("done");
        parentElement.classList.add("error");
    },
    displayDone: function(self) {
        let parentElement = self.closest(".form__group");

        parentElement.classList.remove("error");
        parentElement.classList.add("done");
    },
    selectingDisplayArea: function(self) {
        let val = self.value.toLowerCase(),
            selectChangePath = "type_of_institution";

        function removeActiveClass() {
            let elem = document.getElementsByClassName("form__wrap");

            for(let i = 0; i < elem.length; i++) {
                elem[i].classList.remove("active");
            }
        }

        function addActiveClass(className) {
            let elem = document.getElementsByClassName(className)[0];

            removeActiveClass();
            elem.classList.add("active");
        }

        if(self.name === selectChangePath) {
            if(val === "hospital") {
                addActiveClass("form__wrap_hospital");
            } else if (val === "school") {
                addActiveClass("form__wrap_school");
            }
        }
    }
};


(function(){
    /*...*/
    const   select = document.querySelectorAll("select");
    selectInit(select);

    /*...*/
    validateForm.init();
    validateForm.setEventOnDataChange("blur", "change");
})();