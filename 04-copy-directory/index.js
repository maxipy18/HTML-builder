const fs = require('fs');
const path = require('path');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
    if (error) return console.error(error.message);
  });

  fs.readdir(path.join(__dirname, 'files-copy'), (error, files) => {
    if (error) return console.error(error.message);
    if (files.length) {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', `${file}`), (error) => {
          if (error) return console.error(error.message);
        });
      });
    }
  });

  fs.readdir(path.join(__dirname, 'files'), (error, files) => {
    if (error) return console.error(error.message);
    files.forEach((file) => {
      const initURL = path.join(__dirname, 'files', `${file}`);
      const destURL = path.join(__dirname, 'files-copy', `${file}`);
      fs.copyFile(initURL, destURL, (error) => {
        if (error) return console.error(error.message);
      });
    });
  });
}

copyDir();
