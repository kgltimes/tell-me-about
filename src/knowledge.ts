
declare var require: any;
const axios = require('axios');
import { MRTRAINER_HOST_ADDRESS, TOPTEN_HOST_ADDRESS } from './config';

/*
  Generated class for the Knowledge provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class KnowledgeProvider {
  prefixList: Array<string>;
  topten_host_address: string;
  mrtrainer_host_address: string;
  qa_logger_url: string;
  constructor() {
    console.log('Hello Knowledge Provider');
    this.mrtrainer_host_address = MRTRAINER_HOST_ADDRESS;

    // START INIT
    this.prefixList = ['tell me about', 'who is', 'what is'];
    this.topten_host_address = TOPTEN_HOST_ADDRESS;
    this.qa_logger_url = `${this.topten_host_address}/api/v1/definitions/add`;
    // END INIT
  }

  // START QA-PAIR
  // respond to questions
  // - limited number of questions
  // - save a question along with the device-id
  // - be able to provide a log of asked questions
  findAnswer(question: string): Promise<{ ok: boolean, question: string, response: string }> {

    if (!this._hasValidPrefix(this.prefixList, question)) {
      let ok = false, response = 'Questions must start with "who is" or "what is", please try again!';
      return Promise.resolve({ ok, question, response });
    }

    let searchKeyword = this._removePrefix(this.prefixList, question);
    let url = `${this.mrtrainer_host_address}/tell-me-about/api/v1/definition?text=${searchKeyword}`;
    return this._makeHttpGetRequest(url)
      .then(result => {
        console.log('knowledge - findAnswer -->', result);

        // @TODO save the qa pair along with the device id
        let { ok, question, response } = result;
        return { ok, question, response };
      })
      .catch(e => ({ ok: false, question, response: (e.message || 'failed') }));

  }

	/**
	 * make sure the provided string is in the format accepted as a question
	 */
  private _hasValidPrefix(prefixList: Array<string>, phrase: string = ''): boolean {

    return prefixList.some(prefix => phrase.trim().toLowerCase().search(prefix) === 0);

  }
  private _removePrefix(prefixList: Array<string>, phrase: string = ''): string {

    let prefix = prefixList.find(p => phrase.trim().toLowerCase().search(p) === 0);

    return phrase.trim().toLowerCase()
    .replace(prefix||'', '')
    .replace('\?', '').trim();
    // @TODO we should remove the question mark too
  }
  // END QA-PAIR
  

  // save the 10 articles/audio/videos links found today

  // parse the sentence(title, description) to get the question of the day

  // fetch old articles day-by-day

  // save user provided links


  private _makeHttpGetRequest(get_url: string): Promise<any> {
    return axios.get(get_url)
      .then((res: any) => {
        console.log('http res', res.data);
        let dataJson = res.data;
        // debugger;

        return dataJson;

      })
      .catch(this.handleError);
  }
  private _makeHttpPostRequest(post_url: string, post_data: any): Promise<any> {

    // let body = JSON.stringify(post_data);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    return axios.post(post_url, post_data)
      .then((res: any) => {
        console.log('http res', res.data);
        let dataJson = res.data;
        // debugger;

        return dataJson;

      })
      // .cache()
      .catch(this.handleError);
  }
  // also defined in application.ts
  handleError(error: any): any {


    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Unkown error, maybe you are offline!';
    console.log('error ---->', error, message); // log to console instead
    return Promise.reject({ ok: false, message }); //Observable.throw(errMsg);

  }

  /**
   * I will get the id object from the inside
   */
  logQAResult(question: string, answer: string) {

    let deviceId,
      appHash;
    try {
      deviceId = JSON.stringify(window.navigator.userAgent);
    } catch (e) { }
    try {
      appHash = Math.random().toString().replace('0.', '');
      // save appHash in a cookie
      // this.storage.set('topten-hash', appHash);
      console.log('topten-hash', appHash);
    } catch (e) { }
    let url = `${this.topten_host_address}/api/v1/ask-question?q=${question}`;
    // store appHash in a cookie or localstorage
    let origin = { deviceId, appHash };
    let meta = { url };
    let data = { question, answer, origin, meta };

    return this._makeHttpPostRequest(this.qa_logger_url, data)
      .then(result => {
        console.log('knowledge - logQAResult -->', result);

        // @TODO save the qa pair along with the device id
        return result;
      })
      .catch(e => ({ ok: false, question, answer: (e.message || 'failed') }));

  }


  findDailyQuestion(title: string, description: string): Promise<{ value: string, source: string, timeNow: Date }> {
    // return new Promise((rs, rj) => {
    // let body = JSON.stringify({ name });
    // let headers = new Headers({ 'Content-Type': 'text/html' });
    // let options = new RequestOptions({ headers: headers });
    // let url = `${this.mrtrainer_host_address}/top-ten/api/v1/text-analysis?text=${description}`
    let inputValues = encodeURIComponent(`${title}. ${description}`);
    let url = `${this.mrtrainer_host_address}/top-ten/api/v1/text-analysis?text=${inputValues}`;
    let self = this;
    return axios.get(url)
      .then((output: any) => {
        // @TODO add CORS header to the server
        console.log('[HeadlinePage] findRealSource', output.headers, output.data);
        
        let entities = output.data;
        if (entities.length && entities.length > 0) {
          entities = entities.filter((e: any) => !!e.url); // only entities with source are important
          let people = entities.filter((e: any) => e.type === 'PERSON'), // try people first
            locations = entities.filter((e: any) => e.type === 'LOCATION'), // then try locations
            arts = entities.filter((e: any) => e.type === 'WORK_OF_ART'), // then try work_of_art
            events = entities.filter((e: any) => e.type === 'EVENT'), // then try work_of_art
            organizations = entities.filter((e: any) => e.type === 'ORGANIZATION'); // then try work_of_art

          people = people.length ? people : null;
          arts = arts.length ? arts : null;
          events = events.length ? events : null;
          locations = locations.length ? locations : null;
          organizations = organizations.length ? organizations : null;
          entities = { people, arts, events, locations, organizations };
        }

        // Object.keys(entities);
        // let ekeys = JSON.parse(JSON.stringify(Object.keys(entities)));
        // @TODO use shuffling algorithm from rss provider
        // self._shuffle(ekeys);
        // let key = ekeys[0];
        let selectedEntities = entities.people || entities.arts || entities.events || entities.locations || [];
        console.log('selectedEntities', entities.people, entities.arts, entities.events, entities.locations);
        let prefix, value, source;
        if (selectedEntities.length && selectedEntities.length > 0) {
          self._shuffle(selectedEntities);
          let selectedEntity = selectedEntities[0];
          // the prefix depends on the type of the selected entity
          prefix = (selectedEntity.type === 'PERSON') ? 'Who is' : 'What is';
          value = `${prefix} ${selectedEntity.value}?`;
          source = selectedEntity.url;

        }

        return { value, source, timeNow: new Date() };
      })
      // .toPromise();
  }

  // START help functions
  private _shuffle(inputArray: Array<any>) {
    let len = inputArray.length;
    for (let i = 0; i < inputArray.length; i++) {
      // get a random number between i and inputArray.length(not included)
      let random = this._getRandomInt(i, len);
      // swap element at i with element at random
      let tmp = inputArray[i];
      inputArray[i] = inputArray[random];
      inputArray[random] = tmp;
    }
    return inputArray;
  }
  private _getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // END help functions

}
