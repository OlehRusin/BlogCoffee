const { src, dest, parallel, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const scss = require('gulp-sass')(require('sass'));

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
            notify: false,
            online: true
        }
    })
}



function compile(done) {
    return src("app/scss/**/*.scss")
        .pipe(scss())
        .pipe(dest("app/css/"))
        .pipe(browserSync.reload({ stream: true }))
    done();
}


function startWatch() {
    watch('app/scss/**/*.scss', parallel(compile));
    watch('app/*.html', browserSync.reload);

}

exports.browserSync = browsersync;
exports.compile = compile;

exports.default = parallel(startWatch, compile, browsersync);
