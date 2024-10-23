import * as js2xmlparser from 'js2xmlparser';
import { parseString } from 'xml2js';

class XMLAdapter {
  public static jsonToXml( rootElement: string,json: any): string {
    return js2xmlparser.parse(rootElement, json);
  }

  public static xmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default XMLAdapter;
