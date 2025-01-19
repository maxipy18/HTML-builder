const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (error, files) => {
  if (error) return console.error(error.message);

  files.forEach((file) => {
    fs.lstat(
      path.join(__dirname, 'secret-folder', `${file}`),
      (error, stats) => {
        if (error) return console.error(error.message);
        if (stats.isFile()) {
          const fileName = file.split('.');
          console.log(`${fileName[0]} - ${fileName[1]} - ${stats.size}b`);
        }
      },
    );
  });
});
