/**
 * Button menu burger open/hide
 *
 * @name btnMenuBurger
 * @function
 *
 * @return {string}
 */
function btnMenuBurger() {
    const   btnMenu         = document.querySelectorAll(".btn-menu_js")[0],
            langDropDown    = document.querySelectorAll(".language__drop")[0];

    const   strTagsNameToggle   = "html, body",
            strClassNameToggle  = ".btn-menu--wrap, .menu";

    btnMenu.addEventListener("click", function() {
        let scope           = this,
            arrStrTagsName  = document.querySelectorAll(strTagsNameToggle),
            arrStrClassName = document.querySelectorAll(strClassNameToggle);

        let selectList      = document.querySelectorAll(".form__select-option");

        scope.classList.toggle("active");
        langDropDown.classList.remove("active");

        arrStrTagsName.forEach(function(item) {
            item.classList.toggle("open-menu");
        });
        arrStrClassName.forEach(function(item) {
            item.classList.toggle("active");
        });
        selectList.forEach(function(item) {
            item.removeAttribute("style");
        });
    });
}

/**
 * Show/Hide dropdown container for choose language
 *
 * @name languageShowDropDown
 * @function
 *
 * @return {string}
 */
function languageShowDropDown() {
    const   langBtn         = document.querySelectorAll(".language-js")[0],
            langDropDown    = document.querySelectorAll(".language__drop")[0];

    langBtn.addEventListener("click", function() {
        let selectList          = document.querySelectorAll(".form__select-option");

        langDropDown.classList.toggle("active");

        selectList.forEach(function(item) {
            item.removeAttribute("style");
        });
    });

}

/**
 * @name bodyClickClosest
 * @function
 */
function bodyClickClosest() {
    const   body    = document.getElementsByTagName("body")[0];

    const   strSelectorClosest  = ".language, .menu, .btn-menu--wrap, .form__select",
            strClassNameRemove  = ".language__drop, .btn-menu_js, .btn-menu--wrap, .menu",
            strTagsNameRemove   = "html, body";

    body.addEventListener("click", function(ev) {
        let evTarget        = ev.target.closest(strSelectorClosest),
            arrStrClassName = document.querySelectorAll(strClassNameRemove),
            arrStrTagsName  = document.querySelectorAll(strTagsNameRemove);

        let selectList      = document.querySelectorAll(".form__select-option");

        if(!evTarget) {
            arrStrClassName.forEach(function(item){
                item.classList.remove("active");
            });
            arrStrTagsName.forEach(function(item){
                item.classList.remove("open-menu");
            });
            selectList.forEach(function(item) {
                item.removeAttribute("style");
            });
        }
    });
}

/**
 * @name windowEventChange
 * @function
 */
function windowEventChange() {
    ["resize", "change", "scroll"].map(function(ev) {
        window.addEventListener(ev, function() {
            let selectList  = document.querySelectorAll(".form__select-option");

            selectList.forEach(function(item) {
                item.removeAttribute("style");
            });
        })
    });
}


/* ... */
(function() {
    /**/
    bodyClickClosest();
    /**/
    btnMenuBurger();
    /**/
    languageShowDropDown();
    /**/
    windowEventChange();
})();


/**
 * Function check drag event for elements; and disabled this events
 *
 * @name ondragstart
 * @function
 * @returns {boolean}
 */
window.ondragstart = function() {
    return false;
};
