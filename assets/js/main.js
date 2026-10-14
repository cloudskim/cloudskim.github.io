(function () {
  var root = document.documentElement;
  var MIN = 15, MAX = 30;

  // Font size: buttons add or subtract 2px, saved in the browser.
  document.querySelectorAll('[data-fs]').forEach(function (b) {
    b.addEventListener('click', function () {
      var cur = parseInt(getComputedStyle(root).getPropertyValue('--fs'), 10) || 20;
      var next = Math.min(MAX, Math.max(MIN, cur + parseInt(b.dataset.fs, 10)));
      root.style.setProperty('--fs', next + 'px');
      try { localStorage.setItem('fs', next); } catch (e) {}
    });
  });

  // Light / dark toggle.
  var btn = document.getElementById('theme');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    var next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
