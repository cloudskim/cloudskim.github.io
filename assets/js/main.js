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

  // Theme button: cycles light, dark, matcha.
  var THEMES = ['light', 'dark', 'matcha'];
  var btn = document.getElementById('theme');
  function current() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function label() {
    var c = current(), n = THEMES[(THEMES.indexOf(c) + 1) % THEMES.length];
    if (btn) { btn.title = 'Theme: ' + c + '. Click for ' + n; btn.setAttribute('aria-label', btn.title); }
  }
  if (btn) {
    label();
    btn.addEventListener('click', function () {
      var next = THEMES[(THEMES.indexOf(current()) + 1) % THEMES.length];
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
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
    if (u.origin === location.origin && /\.(pptx?|ppsx|pptm|pdf)$/i.test(u.pathname)) {
      var pdf = /\.pdf$/i.test(u.pathname), w = document.createElement('div'), name = u.pathname.split('/').pop();
      try { name = decodeURIComponent(name); } catch (e) {}
      w.className = 'filefig';
      w.innerHTML = '<div class="video"><iframe loading="lazy" allowfullscreen></iframe></div><p class="file-note"><a download></a></p>';
      w.querySelector('iframe').src = pdf ? u.href : 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(u.href);
      var dl = w.querySelector('a'); dl.href = u.href; dl.textContent = 'Download ' + name;
      return w;
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
    el.innerHTML = '<span class="lc-thumb" hidden></span><span class="lc-body"><strong class="lc-title"></strong>' +
      '<span class="lc-desc"></span><span class="lc-src"><img class="lc-icon" alt="" hidden><span class="lc-domain"></span></span></span>';
    var thumb = el.querySelector('.lc-thumb'), title = el.querySelector('.lc-title'),
        desc = el.querySelector('.lc-desc'), icon = el.querySelector('.lc-icon');
    title.textContent = own || domain;
    desc.textContent = sub;
    el.querySelector('.lc-domain').textContent = domain;

    function fill(d) {
      if (!d) return;
      if (!own && d.title) title.textContent = d.title;
      if (!sub && d.description) desc.textContent = d.description;
      var img = d.image && d.image.url;
      if (img) {
        var i = new Image(); i.alt = ''; i.referrerPolicy = 'no-referrer';
        i.onload = function () { thumb.appendChild(i); thumb.hidden = false; };
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