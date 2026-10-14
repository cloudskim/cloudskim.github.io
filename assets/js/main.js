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
// Turn a paragraph that is just a YouTube or Spotify link into an embedded player.
(function () {
  function embed(url) {
    var u, m;
    try { u = new URL(url); } catch (e) { return null; }
    var h = u.hostname.replace(/^www\./, ''), id = null;
    if (h === 'youtu.be') id = u.pathname.slice(1);
    else if (h === 'youtube.com' || h === 'm.youtube.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v');
      else if ((m = u.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/))) id = m[2];
    }
    if (id) {
      var t = parseInt(u.searchParams.get('t'), 10);
      var v = document.createElement('div');
      v.className = 'video';
      v.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + (t ? '?start=' + t : '') +
        '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
        'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>';
      return v;
    }
    if (h === 'open.spotify.com' &&
        (m = u.pathname.match(/^\/(?:intl-[a-z]+\/)?(track|album|playlist|episode|show|artist)\/(\w+)/))) {
      var s = document.createElement('div');
      s.className = 'spotify';
      s.innerHTML = '<iframe src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '" height="' +
        (m[1] === 'track' || m[1] === 'episode' ? 152 : 352) +
        '" allow="encrypted-media" loading="lazy"></iframe>';
      return s;
    }
    return null;
  }
  document.querySelectorAll('.prose p').forEach(function (p) {
    var a = p.querySelector('a'), txt = p.textContent.trim();
    var url = (a && a.textContent.trim() === txt) ? a.href : (/^https?:\/\/\S+$/.test(txt) ? txt : null);
    var el = url && embed(url);
    if (el) p.replaceWith(el);
  });
})();