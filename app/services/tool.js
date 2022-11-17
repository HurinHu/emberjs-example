import Service from '@ember/service';

export default class ToolService extends Service {
  delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
