const fs = require('fs/promises');
const path = require('path');
const sourceCss = path.join(__dirname, 'styles');
const distCss = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyle() {
  try {
    const styles = await fs.readdir(sourceCss);
    await fs.open(distCss, 'w');
    for await (const file of styles) {
      if (file.split('.').at(-1) === 'css') {
        const fileCss = await fs.readFile(
          path.join(sourceCss, `${file}`),
          'utf-8',
        );
        await fs.writeFile(distCss, fileCss, { flag: 'a' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

mergeStyle();
