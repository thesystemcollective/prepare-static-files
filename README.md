## thesystemcollective/prepare-static-files

this is a cli tool that prepares directories of static files for hosting.

#### install

```bash
npm i --save-dev thesystemcollective/prepare-static-files
```

now, node_modules/.bin/prepare-static-files exists.

#### usage

in package.json:
```json
{
  "scripts": {
    "optimize": "prepare-static-files"
  }
}
```

#### cli script:

if installed globally (npm i -g):
```bash
prepare-static-files --help
```

if installed locally, in your repository:
```
node_modules.bin/prepare-static-files --help
```
