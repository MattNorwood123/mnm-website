(function () {
  var KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function getParam(name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
  }

  function loadStored() {
    try { return JSON.parse(sessionStorage.getItem('mj_attr') || '{}'); } catch (e) { return {}; }
  }

  function saveStored(data) {
    try { sessionStorage.setItem('mj_attr', JSON.stringify(data)); } catch (e) {}
  }

  // Read params from URL; merge into session storage (URL params win)
  var stored = loadStored();
  var hasNew = false;
  KEYS.forEach(function (k) {
    var v = getParam(k);
    if (v) { stored[k] = v; hasNew = true; }
  });
  // Always record landing page on first hit or when a new ad click arrives
  if (!stored.landing_page || hasNew) {
    stored.landing_page = location.pathname;
  }
  if (hasNew || !sessionStorage.getItem('mj_attr')) {
    saveStored(stored);
  }

  // Populate hidden fields in any form on this page
  function populateForm() {
    var attr = loadStored();
    KEYS.forEach(function (k) {
      var el = document.querySelector('[name="' + k + '"]');
      if (el && attr[k]) el.value = attr[k];
    });
    var lp = document.querySelector('[name="landing_page"]');
    if (lp && attr.landing_page) lp.value = attr.landing_page;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateForm);
  } else {
    populateForm();
  }
})();
