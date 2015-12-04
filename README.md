# VuePack cli

Cli tool and generator for [VuePack](https://github.com/egoist/vuepack)

## Install

If you are using Windows you should install UNIX tools brought by Git for Windows.

```bash
npm install -g vuepack
```

## Usage

```bash
vue init HelloWorld
# for chinese users
vue init HelloWorld --cn
# a specific version of Vuepack
# check out all available versions at
# https://github.com/egoist/vuepack/releases
vue init HelloWorld --tag 0.0.2
# be more verbose
vue init HelloWorld --verbose
# generate a component
vue g/generate component counter
```

## License

MIT.
