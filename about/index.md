---
layout: default
title: Profile
permalink: /about/
---
{% assign p = site.data.profile %}
<div class="wrap">
<div class="profile">
{% include avatar.html size="lg" %}
<div>
<h1>{{ p.name }}</h1>
<p class="tagline">{{ p.tagline }}</p>
<p class="links">{% for l in p.links %}<a href="{{ l.url }}">{{ l.name }}</a>{% endfor %}</p>
</div>
</div>
<div class="prose">
{% if p.about %}<h2>About</h2>{{ p.about | markdownify }}{% endif %}
{% if p.skills.size > 0 %}<h2>Skills</h2><ul>{% for s in p.skills %}<li>{{ s }}</li>{% endfor %}</ul>{% endif %}
{% if p.projects.size > 0 %}<h2>Projects</h2>{% for pr in p.projects %}<h3>{% if pr.url %}<a href="{{ pr.url }}">{{ pr.title }}</a>{% else %}{{ pr.title }}{% endif %}</h3><p>{{ pr.description }}</p>{% endfor %}{% endif %}
{% if p.experience.size > 0 %}<h2>Experience</h2>{% for e in p.experience %}<p><strong>{{ e.role }}{% if e.company %}, {{ e.company }}{% endif %}</strong>{% if e.period %} ({{ e.period }}){% endif %}<br>{{ e.description }}</p>{% endfor %}{% endif %}
</div>
</div>
