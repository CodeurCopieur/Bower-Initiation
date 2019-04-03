const gulp = require('gulp');
      sass = require('gulp-sass');
      concat = require('gulp-concat');
      del = require('del');

const paths = {
        css: {
            src : ['AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap.scss', 'AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap-grid.scss', 'AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap-reboot.scss', 'src/scss/index.scss'],
            dest : 'build/assets/css'
        },
       fonts: {
            src : ['AppBundle/Ressources/bower_components/Font-Awesome/css/*.min.scss'],
            dest : 'build/assets/fonts'
        }
    }

// supprimer le dossier assets
const clean = () => del([paths.css.dest]);

function css() {
     //où est mon fichier scss
    return gulp.src(paths.css.src)
    //passer ce fichier par le compilateur sass
    .pipe(sass())
    .pipe(concat('index.css'))
    //Où puis-je sauvegarder le scss compilé ?
    .pipe(gulp.dest(paths.css.dest))
}

function fonts() {
    return gulp.src(paths.fonts.src)
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest(paths.fonts.dest))
}

const build = gulp.series(clean, gulp.parallel(css));

exports.clean = clean;
exports.css = css;
exports.fonts = fonts;
exports.build = build;

//Nous assignons également cette nouvelle tâche build comme étant notre tâche par défaut :
gulp.task('default', build);