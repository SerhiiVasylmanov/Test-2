const project_folder = "docs";
const source_folder = "src";

const path = {
    build: {
        html: project_folder,
        css: project_folder,
        img: project_folder + "/assets/",
        script: project_folder,
        fonts: project_folder,
    },
    src: {
        html: source_folder + "/**/index.html",
        css: source_folder + "/**/main.scss",
        img: source_folder + "/image/**/*.{jpg,jpeg,png,svg}",
        script: source_folder + "/**/*.js",
        fonts: source_folder + "/fonts/**/*.{ttf,woff,woff2,svg,eot}",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/**/*.scss",
        img: source_folder + "/image/**/*.{jpg,jpeg,png,svg}",
        script: source_folder + "/**/*.js",
        fonts: source_folder + "/fonts/**/*.{ttf,woff,woff2,svg,eot}",
    },
    clean: "./" + project_folder + "/"
}

const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "docs/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


function copy() {
    return src('src/image/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(dest('docs/'))
        .pipe(browsersync.stream());

}

function script() {
    return src(path.src.script)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.build.script));
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}


function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.img], copy);
    gulp.watch([path.watch.script], script);

}

function claen(params) {
    return del(path.clean);
}

let build = gulp.series(claen, gulp.parallel(css, html, script), copy, fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.copy = copy;

