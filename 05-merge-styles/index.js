const fs = require('fs');
const path = require('path');
const distCss = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(path.join(__dirname, 'project-dist'), (error, files) => {
  if (error) return console.error(error.message);
  files.forEach((file) => {
    if (file === 'bundle.css') {
      fs.unlink(distCss, (error) => {
        if (error) return console.error(error.message);
      });
    }
  });
  fs.open(distCss, 'w', (error) => {
    if (error) return console.error(error.message);
  });
});

fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
  if (error) return console.error(error.message);
  if (files.length) {
    files.forEach((file) => {
      if (file.split('.').at(-1) === 'css') {
        const fileCss = path.join(__dirname, 'styles', `${file}`);
        fs.readFile(fileCss, 'utf-8', (error, data) => {
          if (error) return console.error(error.message);
          fs.appendFile(distCss, data, (error) => {
            if (error) return console.error(error.message);
          });
        });
      }
    });
  }
});
