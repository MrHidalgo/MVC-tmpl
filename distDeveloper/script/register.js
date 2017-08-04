"use strict";

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
    for (var key in obj) {
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
    var childElem = node.parentNode.childNodes,
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
    elem.forEach(function (item) {
        var self = item,
            optArr = self.children,
            selectWrap = self.closest(".form__select"),
            input = self.nextElementSibling;

        var ulList = document.createElement("ul");
        ulList.setAttribute("class", "form__select-option");

        for (var i = 0; i < optArr.length; i++) {
            var liItem = document.createElement("li");

            setAttributes(liItem, {
                "class": "form__select-item"
            });

            liItem.innerText = optArr[i].value;

            liItem.addEventListener("click", function (ev) {
                var itemVal = ev.target.innerText,
                    idx = getIndex(ev.target);

                var optionSelect = self.getElementsByTagName("option"),
                    optionSelectCurrent = optionSelect[idx];

                var event = new Event("change");

                for (var j = 0; j < optionSelect.length; j++) {
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

        input.addEventListener("click", function (ev) {
            var self = ev.target,
                winHeight = window.innerHeight,
                rect = self.getBoundingClientRect(),
                dropContainerAll = document.querySelectorAll(".form__select-option"),
                dropContainerCurrent = self.nextElementSibling;

            var top = rect.top + rect.height,
                bottom = winHeight - rect.bottom + rect.height,
                left = rect.left,
                width = rect.width;

            var freeSpace = winHeight - rect.bottom,
                maxHeightBlockTop = winHeight - rect.bottom,
                maxHeightBlockBottom = rect.top;

            var positionObj = "";

            if (freeSpace > 100) {
                positionObj = "top:" + top + "px;max-height:" + maxHeightBlockTop + "px;";
            } else {
                positionObj = "bottom:" + bottom + "px;max-height:" + maxHeightBlockBottom + "px;";
            }

            var objStyle = "display:block;left:" + left + "px; width:" + width + "px;" + positionObj;

            dropContainerAll.forEach(function (item) {
                item.removeAttribute("style");
            });
            setAttributes(dropContainerCurrent, {
                "style": objStyle
            });
        });
    });
}

var validateForm = {
    steps: {
        "0": {},
        "1": {},
        "2": {}
    },
    fields: {
        "first_name": {
            event: "blur",
            method: "textValidation"
        },
        "surname": {
            event: "blur",
            method: "textValidation"
        },
        "title": {
            event: "change",
            method: "notEmptyValidation"
        },
        "gender": {
            event: "change",
            method: "notEmptyValidation"
        },
        "type_of_institution": {
            event: "change",
            method: "notEmptyValidation"
        },
        "speciality": {
            event: "change",
            method: "notEmptyValidation"
        },
        "level_of_training": {
            event: "change",
            method: "notEmptyValidation"
        },
        "hospital": {
            event: "change",
            method: "notEmptyValidation"
        },
        "school": {
            event: "change",
            method: "notEmptyValidation"
        },
        "country": {
            event: "change",
            method: "notEmptyValidation"
        },
        "language": {
            event: "change",
            method: "notEmptyValidation"
        },
        "email": {
            event: "blur",
            method: "emailValidation"
        },
        "create_password": {
            event: "blur",
            method: "passwordValidation"
        },
        "confirm_password": {
            event: "blur",
            method: "passwordValidation"
        }
    },
    pattern: {
        text: "^[a-z\.0-9 ]+$",
        email: "^[a-z0-9]+[a-z0-9'._%+\\-]*[a-z0-9]*\\@(?:[a-z0-9]+(?:-[a-z0-9]+)*\\.)+[a-z]{2,}$"
    },
    patternText: function patternText(str) {
        var reg = new RegExp(this.pattern.text, "gi");

        return reg.test(str);
    },
    patternEmail: function patternEmail(str) {
        var reg = new RegExp(this.pattern.email, "gi");

        return reg.test(str);
    },
    init: function init() {},
    setEventOnDataChange: function setEventOnDataChange(event1, event2) {
        var arrBlur = this.getFieldsNameArr(event1)[0],
            arrChange = this.getFieldsNameArr(event1)[1];

        this.renderEvent(arrBlur, event1);
        this.renderEvent(arrChange, event2);
    },
    renderEvent: function renderEvent(arr, event) {
        arr.map(function (elem) {
            document.getElementsByName(elem).forEach(function (item) {
                item.addEventListener(event, function () {
                    validateForm.validateField(this);
                });
            });
        });
    },
    getFieldsNameArr: function getFieldsNameArr(event) {
        var arrBlur = [],
            arrChange = [];

        for (var name in this.fields) {
            if (this.fields.hasOwnProperty(name)) {
                if (this.fields[name].event === event) {
                    arrBlur.push(name);
                } else {
                    arrChange.push(name);
                }
            }
        }

        return [arrBlur, arrChange];
    },
    validateField: function validateField(self) {
        var nameElem = self.name;

        console.log("{\"" + self.name + "\" : \"" + self.value + "\"}");

        for (var fieldsName in this.fields[nameElem]) {
            if (this.fields[nameElem].hasOwnProperty(fieldsName)) {
                this[this.fields[nameElem]["method"]](self);
            }
        }
    },
    textValidation: function textValidation(self) {
        var val = self.value;

        if (val.length < 3 || !this.patternText(val)) {
            return this.displayError(self);
        }

        return this.displayDone(self);
    },
    notEmptyValidation: function notEmptyValidation(self) {
        var val = self.value.toLowerCase();

        if (val.length === 0) {
            return this.displayError(self);
        }

        this.selectingDisplayArea(self);

        return this.displayDone(self);
    },
    emailValidation: function emailValidation(self) {
        var val = self.value;

        if (this.patternEmail(val)) {
            return this.displayDone(self);
        }

        return this.displayError(self);
    },
    passwordValidation: function passwordValidation(self) {
        var val = self.value;

        if (val.length < 6) {
            return this.displayError(self);
        }

        if (self.name === "confirm_password") {
            var valCreatePass = document.getElementsByName("create_password")[0].value;

            if (val.length < 6 || valCreatePass !== val) {
                return this.displayError(self);
            }
        }

        return this.displayDone(self);
    },
    displayError: function displayError(self) {
        var parentElement = self.closest(".form__group");

        parentElement.classList.remove("done");
        parentElement.classList.add("error");
    },
    displayDone: function displayDone(self) {
        var parentElement = self.closest(".form__group");

        parentElement.classList.remove("error");
        parentElement.classList.add("done");
    },
    selectingDisplayArea: function selectingDisplayArea(self) {
        var val = self.value.toLowerCase(),
            selectChangePath = "type_of_institution";

        function removeActiveClass() {
            var elem = document.getElementsByClassName("form__wrap");

            for (var i = 0; i < elem.length; i++) {
                elem[i].classList.remove("active");
            }
        }

        function addActiveClass(className) {
            var elem = document.getElementsByClassName(className)[0];

            removeActiveClass();
            elem.classList.add("active");
        }

        if (self.name === selectChangePath) {
            if (val === "hospital") {
                addActiveClass("form__wrap_hospital");
            } else if (val === "school") {
                addActiveClass("form__wrap_school");
            }
        }
    }
};

(function () {
    /*...*/
    var select = document.querySelectorAll("select");
    selectInit(select);

    /*...*/
    validateForm.init();
    validateForm.setEventOnDataChange("blur", "change");
})();