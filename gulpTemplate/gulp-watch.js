/* NPM PACKAGE */
const gulp          =   require('gulp')
    , watch         =   require('gulp-watch');


/* GULP PATH [module] */
const command       =   require('./gulp-command.js')
    , config        =   require('./gulp-config.js')
    , taskJs        =   require('./gulp-js.js')
    , srcWatch      =   require('./gulp-srcFilesWatch');


exports.mainWatchTask = function(taskName) {


    const srcWatchSCSS  = srcWatch.scssFiles
        , srcWatchLESS  = srcWatch.lessFiles
        , srcWatchJADE  = srcWatch.jadeFiles
        , srcWatchJSON  = srcWatch.jsonFiles
        , srcWatchJS    = srcWatch.jsFiles
        , srcWatchICON  = srcWatch.iconFiles
        , srcWatchIMG   = srcWatch.imageFiles;


    return gulp.task(taskName, function() {

        watch(srcWatchSCSS, function () {
            gulp.start(command.buildScss);
        });

        watch(srcWatchLESS, function () {
            gulp.start(command.buildLess);
        });

        watch(srcWatchJADE, function() {
            gulp.start(command.buildJade);
        });

        watch(srcWatchJS).on("change", function(filePath) {

            const strFrom   = filePath.lastIndexOf('\\') + 1
                , strTo     = ".js".length,
                fileName    = filePath.slice(strFrom, -strTo);

            taskJs.mainScriptTask(command.buildScript, fileName);

            gulp.start(command.buildScript)
        });

        watch(srcWatchJSON, function() {
            gulp.start(command.buildJade);
        });

        watch(srcWatchICON, function() {
            gulp.start(command.sprites)
        });

        watch(srcWatchIMG, function() {
            gulp.start(command.buildImg);
        });
    });
};