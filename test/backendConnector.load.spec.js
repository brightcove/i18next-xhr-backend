import BackendConnector from 'i18next/lib/BackendConnector.js';
import XHR from '../src/';
import Interpolator from 'i18next/lib/Interpolator';
import ResourceStore from 'i18next/lib/ResourceStore.js';

describe('BackendConnector basic load', () => {
  let connector;

  before(() => {
    connector = new BackendConnector(new XHR(), null, new ResourceStore(), {
      interpolator: new Interpolator()
    }, {
      backend: { loadPath: 'http://localhost:9876/locales/{{lng}}/{{ns}}.json' }
    });
  });

  describe('#load', () => {
    it('should load data', (done) => {
      connector.load(['en'], ['test'], function(err) {
        expect(err).to.be.not.ok;
        expect(connector.store.getResourceBundle('en', 'test')).to.eql({key: 'passing'});
        done();
      });
    });
  });
});
