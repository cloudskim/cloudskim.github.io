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
{% if p.education.size > 0 %}<h2>Education</h2>{% for e in p.education %}<p><strong>{{ e.degree }}{% if e.school %}, {{ e.school }}{% endif %}</strong>{% if e.period %} ({{ e.period }}){% endif %}{% if e.description %}<br>{{ e.description }}{% endif %}</p>{% endfor %}{% endif %}
{% if p.certifications.size > 0 %}<h2>Certifications</h2><ul>{% for c in p.certifications %}<li>{% if c.url and c.url != "" %}<a href="{{ c.url }}">{{ c.name }}</a>{% else %}{{ c.name }}{% endif %}{% if c.issuer %}, {{ c.issuer }}{% endif %}{% if c.year %} ({{ c.year }}){% endif %}</li>{% endfor %}</ul>{% endif %}
</div>
</div>
