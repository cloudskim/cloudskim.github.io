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

I found out that port 80 (http) and 22(ssh) are active. I checked the ip in the brower and saw that it is a login page for internal page for support operations.

![](/assets/images/image-7.png)

Before I try logging in, I tried it's exposed endpoints using this:

```
gobuster dir -u http://<ip>/ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt -t 50 -x php
```

![image.png](/assets/images/image-9.png)

Checked the exposed endpoints and most of them are either empty. I can only see info.php contents which are not that really useful.

Then I tried to login to the portal using brute force technique using hydra.

I first need to guess the email. I tried the one used as the placeholder "[help@support.thm](mailto:help@support.thm)" as follows.

This worked:

```
hydra -l help@support.thm -P /usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-10000.txt 10.49.187.109 http-post-form "/:email=^USER^&password=^PASS^:F=Invalid credentials" -t 10 -w 1 -f -V -o found.txt
```

![image.png](/assets/images/image-4.png)

I found that the password for [help@support.thm](mailto:help@support.thm) is "snoopy". So freaking exciting. I can now access the "api.php" and go to endpoint "/user/3". 

![image.png](/assets/images/image-1.png)

There I can go to /user/3

![image.png](/assets/images/image-2.png)

Then I know that it is not admin account, so I can simply modify to "/user/1". This vulnerability is called **Insecure direct object references (IDOR)** which is a type of access control vulnerability that arises when an application uses user-supplied input to access objects directly.

![image.png](/assets/images/image-3.png)

Here I can see the value "admin" was false for "[help@support.thm](mailto:help@support.thm)" but is true for "[specialadmin@support.thm](mailto:specialadmin@support.thm)". So, we have to find a way to login with that email to get admin access.



ffuf -u "[http://10.48.170.191/?skin=FUZZ](http://10.48.170.191/?skin=FUZZ)" \

  -w /usr/share/wordlists/SecLists/Fuzzing/LFI/LFI-Jhaddix.txt \

  -mr "root:x:0:0" -t 50 -o lfi_hits.json

Reference:

[https://portswigger.net/web-security/access-control/idor](https://portswigger.net/web-security/access-control/idor)

This Github Repo is Good:  [https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion)