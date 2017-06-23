import { KnowledgeProvider } from './knowledge';
const knowledgeProvider = new KnowledgeProvider();

export const handler =  (event: {[key: string]: any}, context: {[key: string]: any}) => {
  console.log('START event')
  console.log(event.inputTranscript)
  console.log('END event')
  console.log('START context')
  console.log(context)
  console.log('END context')

  let response = {
    dialogAction: {
      type: 'Close',
      fulfillmentState: 'Fulfilled',
      message: {
        contentType: 'PlainText',
        content: 'I currently do not know that :('
      }
    }
  }
  return knowledgeProvider.findAnswer(event.inputTranscript)
  .then(answer => { // answer = {ok, question, response }
    response.dialogAction.message.content = answer.response
    context.succeed(response)
  })
  .catch(() => context.succeed(response))
}