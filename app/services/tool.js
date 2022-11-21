import Service from '@ember/service';

export default class ToolService extends Service {
  // this delay functio will pause for million second and then return a promise, delay(1000).then(()=>{})
  delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
