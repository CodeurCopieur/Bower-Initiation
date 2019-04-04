const gulp = require('gulp');
      sass = require('gulp-sass');
      concat = require('gulp-concat');
      del = require('del');
      browserSync = require('browser-sync').create();

const paths = {
        css: {
            src : ['AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap.scss', 'AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap-grid.scss', 'AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap-reboot.scss', 'src/scss/index.scss'],
            dest : 'build/assets/css'
        },
       fonts: {
            src : ['AppBundle/Ressources/bower_components/Font-Awesome/css/*.min.css'],
            dest : 'build/assets/fonts'
        },
        html : {
            dest: 'build/*.html'
        }
    }

// supprimer le dossier assets
const clean = () => del([paths.css.dest]);

function css() {
     //où est mon fichier scss
    return gulp.src(paths.css.src)
    //passer ce fichier par le compilateur sass
    .pipe(sass())
    //permet de concaténer tout notre code source dans un seul fichier
    .pipe(concat('index.css'))
    //Où puis-je sauvegarder le scss compilé ?
    .pipe(gulp.dest(paths.css.dest))
    //transférer les modifications sur tous les navigateurs
    .pipe(browserSync.stream())
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: true,
        port: 8001
    });
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.html.dest).on('change', browserSync.reload);
}

function fonts() {
    return gulp.src(paths.fonts.src)
    //.pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest(paths.fonts.dest))
}

const build = gulp.series(clean, gulp.parallel(css));

exports.clean = clean;
exports.css = css;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;

//Nous assignons également cette nouvelle tâche build comme étant notre tâche par défaut :
gulp.task('default', build);