'use strict';
const moxios = require('moxios');
const TellMeAbout = require('../../es5/index');

const event = {
    messageVersion: '1.0',
    invocationSource: 'FulfillmentCodeHook',
    userId: 'vnk1v2paszc7ti0op1omwh7ko64zybcp',
    sessionAttributes: null,
    bot: { name: 'TopTenLex', alias: null, version: '$LATEST' },
    outputDialogMode: 'Text',
    currentIntent: { name: 'TellMeAbout', slots: {}, confirmationStatus: 'None' },
    inputTranscript: 'tell me about Rwanda'
};


const context = {
    callbackWaitsForEmptyEventLoop: 'TODO',
    done: function done(r) { return r; },
    succeed: function succeed(r) { return r; },
    fail: function fail(e) { return e; },
    logGroupName: '/aws/lambda/tell-me-about-lex',
    logStreamName: '2017/06/21/[$LATEST]4a1e50927f664e44a857cc9addcb77c1',
    functionName: 'tell-me-about-lex',
    memoryLimitInMB: '128',
    functionVersion: '$LATEST',
    getRemainingTimeInMillis: function getRemainingTimeInMillis(t) { return t; },
    invokeid: '939461c7-56d4-11e7-9278-dda5f8a12ec4',
    awsRequestId: '939461c7-56d4-11e7-9278-dda5f8a12ec4',
    invokedFunctionArn: 'arn:aws:lambda:us-east-1:373435703735:function:tell-me-about-lex'
};

describe('tell me about', () => {
    
    // required by axios
    beforeEach(function () {
        moxios.install()
    });

    afterEach(function () {
        moxios.uninstall()
    });


    test('Finds Information about Rwanda', () => {

        (new Promise((resolve, reject) => {
            context.succeed = (s) => resolve(s);
            context.fail = (e) => reject(e);
            return TellMeAbout.handler(event, context);
        }))
            .then(output => {
                console.log('SUCCESS', output);
                expect(output.response).toBe(expect.stringMatching(/africa/i));
            })
            .catch(e => {
                console.log('FAIL', e);
            });
    });

});