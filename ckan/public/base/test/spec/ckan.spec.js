describe('ckan.initialize()', function () {
  beforeEach(function () {
    this.promise = jQuery.Deferred();
    this.target = sinon.stub(ckan.Client.prototype, 'getLocaleData').returns(this.promise);
  });

  afterEach(function () {
    this.target.restore();
  });

  it('should load the localisations for the current page', function () {
    ckan.initialize()
    assert.called(this.target);
  });

  it('should load the localisations into the i18n library', function () {
    var target = sinon.stub(ckan.i18n, 'load');
    var data = {lang: {}};

    ckan.initialize();
    this.promise.resolve(data);

    assert.called(target);
    assert.calledWith(target, data);

    target.restore();
  });

  it('should initialize the module on the page', function () {
    var target = sinon.stub(ckan.module, 'initialize');

    ckan.initialize();
    this.promise.resolve();

    assert.called(target);
    target.restore();
  });
});

describe('ckan.url()', function () {
  beforeEach(function () {
    ckan.SITE_ROOT = 'http://example.com';
    ckan.LOCALE_ROOT = ckan.SITE_ROOT + '/en';
  });

  it('should return the ckan.SITE_ROOT', function () {
    var target = ckan.url();
    assert.equal(target, ckan.SITE_ROOT);
  });

  it('should return the ckan.LOCALE_ROOT if true is passed', function () {
    var target = ckan.url(true);
    assert.equal(target, ckan.LOCALE_ROOT);
  });

  it('should append the path provided', function () {
    var target = ckan.url('/test.html');
    assert.equal(target, ckan.SITE_ROOT + '/test.html');
  });

  it('should append the path to the locale provided', function () {
    var target = ckan.url('/test.html', true);
    assert.equal(target, ckan.LOCALE_ROOT + '/test.html');
  });

  it('should handle missing preceding slashes', function () {
    var target = ckan.url('test.html');
    assert.equal(target, ckan.SITE_ROOT + '/test.html');
  });
});
