import { BASIC_URL } from './constants';

class UrlBuilderService {
  constructor(){ }

  getUrl = (params, route = '') => {
    return BASIC_URL + route + '?' + this.getQueryStringFromObject(params);
  }

  getQueryStringFromObject = (params) => {
    let queryString = '';
    for (let key in params) {
      queryString += key + '=' + params[key] + '&';
    }
    return queryString;
  }
}

export const urlBuilderService = new UrlBuilderService();