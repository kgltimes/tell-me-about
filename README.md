# tell-me-about

[![Build Status][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url] [![Dependency Status][dependency-image]][dependency-url] [![Code Climate][climate-image]][climate-url] [![MIT License][license-image]][license-url]


Bot that explains to people important terms (such as famous people and place), that they find while reading news.

## Development

### Basic
* Download the code `git clone <repo>`
* Install dependancies `npm install`
* Build the deployable code `npm run build`
* Run tests `npm test`

### Detailed information
* The system is a `AWS lambda function`
* We use `Typescript` as the coding language
* We use `Rollup` as the build system (Babel plugins)
* We use `jest` for testing

Compile Typescript code to ES6, then transpile ES6 code to ES5. *ES5 is stored in a bin folder*

I recomend looking through the `package.json` to understand each command

## Deployment
* We use [Claudiajs](https://claudiajs.com/) to ease the deploayment process
* Replace **AWS profile name** with the correct one inside `package.json` or just use the command below
```bash
# on mac ox
export AWS_PROFILE=<profile-name>
```
* Deploy the lambda function by typing `npm run create`


[travis-image]: https://travis-ci.org/kgltimes/tell-me-about.svg?branch=master
[travis-url]: https://travis-ci.org/kgltimes/tell-me-about

[codecov-image]: https://codecov.io/gh/kgltimes/tell-me-about/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/kgltimes/tell-me-about

[dependency-image]: https://gemnasium.com/badges/github.com/kgltimes/tell-me-about.svg?style=flat
[dependency-url]: https://gemnasium.com/github.com/kgltimes/tell-me-about

[climate-image]: https://codeclimate.com/github/kgltimes/tell-me-about/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/kgltimes/tell-me-about

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
