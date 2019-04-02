const gulp = require('gulp');
      sass = require('gulp-sass');
      concat = require('gulp-concat');
      del = require('del');

const paths = {
        css: {
            src : ['AppBundle/Ressources/bower_components/bootstrap/scss/bootstrap.scss', 'src/scss/index.scss'],
            dest : 'build/assets/css'
        }
    }

// supprimer le dossier assets
const clean = () => del([paths.css.dest]);

function css() {
    return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(concat('index.css'))
    .pipe(gulp.dest(paths.css.dest))
}

const build = gulp.series(clean, gulp.parallel(css));

exports.clean = clean;
exports.css = css;
exports.build = build;

gulp.task('default', build);