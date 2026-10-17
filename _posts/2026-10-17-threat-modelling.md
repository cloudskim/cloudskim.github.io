---
title: Threat Modelling
subtitle: Steps for threat modelling
tags:
  - Blog Post
  - Threat Modelling
  - Red Teaming
---
### Scope and Brief (with Examples)

- Components: monolithic application with massive amount of features 
- Environment: cloud hosted (AWS) Scope: unauthenticated and authenticated access 
- Authentication & Authorization (Authn/Authz): Limited unauth features, concept of vertical privileges and permissions, attribute-based access controls (ABAC), multi-tenant application. 
- Source Code Access: N/A

### Application Logic Flow

Client side interaction --> HTTP request to server --> Server middleware --> Server API handling --> Application function --> Application logic --> HTTP response

## Reconnaissance



![Components of URI](/assets/images/image.png)



&nbsp;

---

### Resouces

[https://jakewnuk.com/static/Chaining%20for%20Critical%20An%20Application%20Security%20Bug%20Talk.pdf](https://jakewnuk.com/static/Chaining%20for%20Critical%20An%20Application%20Security%20Bug%20Talk.pdf)