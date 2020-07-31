import TdClient from 'tdweb/dist/tdweb';
import options from './options';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {API_ID, API_HASH} from './api';

@Injectable({
  providedIn: 'root'
})
export class Tg {

  client: TdClient;
  update$: BehaviorSubject<any>;
  action: () => void;

  constructor() {
    this.update$ = new BehaviorSubject(null);
    options.onUpdate = update => this.update$.next(update);
    this.client = new TdClient(options);
  }

  send(request: any): void {
    this.client.send(request)
      .then((update) => this.update$.next(update))
      .catch((err) => console.log(err.message));
  }

  setTdLibParametrs(): void {
    this.send({
      '@type': 'setTdlibParameters',
      parameters: {
        '@type': 'tdParameters',
        use_test_dc: false,
        api_id: API_ID,
        api_hash: API_HASH,
        system_language_code: 'en',
        // system_language_code: navigator.language || 'en',
        device_model: 'Chrome',
        system_version: 'Windows 10',
        application_version: '0.01',
        use_secret_chats: false,
        use_message_database: true,
        use_file_database: false,
        database_directory: '/db',
        files_directory: '/'
      },
      '@extra': {
        a: ['a', 'b'],
        b: 123
      }
    });
  }

}
