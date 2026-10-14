---
title: THM Challenge "Corridor" writeup
subtitle: almost lost my brain trying to understand what this question is
  supposed to mean !
tags:
  - Tryhackme
  - TryhackmeWalkthrough
image: /assets/images/1_J2Urmnki78k_n3OZkwKsuQ.png
---
It says that 5 mins “Easy” challenge, which took me like half an hour to figure it out. 

The given question is:

> You have found yourself in a strange corridor. Can you find your way back to where you came?

> In this challenge, you will explore potential IDOR vulnerabilities. Examine the URL endpoints you access as you navigate the website and note the hexadecimal values you find (they look an awful lot like a *hash*, don’t they?). This could help you uncover website locations you were not expected to access.

I first had difficulty finding the said webpage, then I saw the victim ip, so I got it.

Then I surf through the webpage, found the links to each door /static/img/empty_room.jpg , the question clearly said the hint but me being me, don’t get it so, I kept searching the hidden urls, and failing.

Then I found some interesting urls, /static/img/empty_room.png after typing it in the address bar. Thought that was helpful but wasn’t. Then I went back to the question, thought about the link names to each door. Then I find what those values mean.

I realized it was 1 to 13 in MD5 hash values, so I tried the numbers after that (felt stupid after finding out that is not how it needs to be done).

![](/assets/images/1__FG98l-Ao0kg2mHKqYThtw.png)

 tried all, even like string “flag”, thought I was right but I keep hitting the wall.

Then I realized that I haven’t tried 0, so I tried it and it worked, got the flag. YAY!!!

The flag is: *flag{2477ef02448ad9156661ac40a6b8862e}*

Nevertheless, it was fun, working out my brain a little bit, and taught me to read the question more closely.