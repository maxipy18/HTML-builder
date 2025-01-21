const fs = require('fs/promises');
const path = require('path');

async function htmlBuilder() {
  let template = await fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );

  const components = await fs.readdir(path.join(__dirname, 'components'));
  for await (const name of components) {
    const component = await fs.readFile(
      path.join(__dirname, 'components', `${name}`),
      'utf-8',
    );
    const tagName = name.split('.')[0];
    template = template.replaceAll(`{{${tagName}}}`, component);
  }
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  await fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w');
  await fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    template,
  );
  await fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w');
  const styles = await fs.readdir(path.join(__dirname, 'styles'));
  for await (const style of styles) {
    const styleFile = await fs.readFile(
      path.join(__dirname, 'styles', `${style}`),
      'utf-8',
    );
    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      styleFile,
      { flag: 'a' },
    );
  }

  const initFolder = path.join(__dirname, 'assets');
  const distFolder = path.join(__dirname, 'project-dist', 'assets');
  async function createAssets(source, dist) {
    await fs.mkdir(dist, { recursive: true });
    const files = await fs.readdir(source, { withFileTypes: true });
    files.forEach((file) => {
      if (!file.isFile()) {
        createAssets(path.join(source, file.name), path.join(dist, file.name));
      } else {
        fs.copyFile(path.join(source, file.name), path.join(dist, file.name));
      }
    });
  }

  createAssets(initFolder, distFolder);
}

htmlBuilder();
