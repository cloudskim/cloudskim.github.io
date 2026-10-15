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
// Embeds and link cards: a paragraph that holds only a link becomes a player or a card.
(function () {
  function player(u) {
    var h = u.hostname.replace(/^www\./, ''), id = null, m;
    if (h === 'youtu.be') id = u.pathname.slice(1);
    else if (h === 'youtube.com' || h === 'm.youtube.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v');
      else if ((m = u.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/))) id = m[2];
    }
    if (id) {
      var t = parseInt(u.searchParams.get('t'), 10), v = document.createElement('div');
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
      s.innerHTML = '<iframe src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?theme=0" height="' +
        (m[1] === 'track' || m[1] === 'episode' ? 152 : 352) +
        '" allow="encrypted-media" loading="lazy"></iframe>';
      return s;
    }
    return null;
  }

  function cached(url) {
    try {
      var c = JSON.parse(localStorage.getItem('lc:' + url));
      if (c && Date.now() - c.t < 7 * 864e5) return c.d;
    } catch (e) {}
    return null;
  }

  function card(a, u) {
    var domain = u.hostname.replace(/^www\./, '');
    var label = a.textContent.trim();
    var own = label && label !== a.getAttribute('href') && label !== u.href ? label : '';
    var sub = a.getAttribute('title') || '';
    var el = document.createElement('a');
    el.className = 'linkcard'; el.href = u.href; el.target = '_blank'; el.rel = 'noopener noreferrer';
    el.innerHTML = '<span class="lc-thumb"></span><span class="lc-body"><strong class="lc-title"></strong>' +
      '<span class="lc-desc"></span><span class="lc-src"><img class="lc-icon" alt="" hidden><span class="lc-domain"></span></span></span>';
    var thumb = el.querySelector('.lc-thumb'), title = el.querySelector('.lc-title'),
        desc = el.querySelector('.lc-desc'), icon = el.querySelector('.lc-icon');
    title.textContent = own || domain;
    desc.textContent = sub;
    el.querySelector('.lc-domain').textContent = domain;
    thumb.textContent = domain.charAt(0).toUpperCase();

    function fill(d) {
      if (!d) return;
      if (!own && d.title) title.textContent = d.title;
      if (!sub && d.description) desc.textContent = d.description;
      var img = d.image && d.image.url;
      if (img) {
        var i = new Image(); i.alt = ''; i.loading = 'lazy';
        i.onload = function () { thumb.textContent = ''; thumb.appendChild(i); };
        i.src = img;
      }
      var logo = d.logo && d.logo.url;
      if (logo) { icon.onload = function () { icon.hidden = false; }; icon.src = logo; }
    }

    if (u.origin !== location.origin) {
      var c = cached(u.href);
      if (c) fill(c);
      else fetch('https://api.microlink.io/?url=' + encodeURIComponent(u.href))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var d = j && j.status === 'success' ? j.data : {};
          try { localStorage.setItem('lc:' + u.href, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
          fill(d);
        }).catch(function () {});
    }
    return el;
  }

  document.querySelectorAll('.prose p').forEach(function (p) {
    var a = p.querySelector('a'), txt = p.textContent.trim(), u;
    if (a && a.textContent.trim() === txt) { /* [text](url) alone */ }
    else if (/^https?:\/\/\S+$/.test(txt)) { a = document.createElement('a'); a.href = txt; a.textContent = txt; }
    else return;
    try { u = new URL(a.href); } catch (e) { return; }
    p.replaceWith(player(u) || card(a, u));
  });
})();