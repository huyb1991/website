const sass = require('node-sass'),
      postcss = require('postcss'),
      fs = require('fs'),
      inputFile = './src/styles/main.scss',
      outputFile = './dist/styles.css'

sass.render({
  file: inputFile,
  outputStyle: 'compressed'
}, (error, result) => {
  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  } else {
    let cssOutput = result.css.toString();

    postcss([ require('autoprefixer'), require('cssnano') ])
      .process(cssOutput)
      .then((result) => {
        fs.writeFile(outputFile, result.css, err => {
          if (err) {
            return console.log(err);
          }
          console.log('\u2611 file '+outputFile+' updated with current styling from '+ inputFile);
        });
      });
  }
});