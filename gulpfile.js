var gulp = require("gulp");
var child = require("child_process");
var autoprefixer = require("gulp-autoprefixer");

function jekyllBuild(env = "development") {
    env = "JEKYLL_ENV=" + env + " ";
    child.execSync(env + "jekyll build", { stdio: "inherit" });
}

gulp.task("build", jekyllBuild.bind(null, "netlify"));

gulp.task("prefix", ["build"], function () {
    return gulp.src("./_site/css/main.css")
        .pipe(autoprefixer())
        .pipe(gulp.dest("./_site/css"));
});

gulp.task("default", ["build", "prefix"]);
