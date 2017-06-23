# tell-me-about

[![Build Status](https://travis-ci.org/kgltimes/tell-me-about.svg?branch=master)](https://travis-ci.org/kgltimes/tell-me-about)

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
