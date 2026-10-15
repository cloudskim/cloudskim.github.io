---
title: Creating wordlists using tools
subtitle: This is a work in progress
---
Real people's names often appear in email addresses and login IDs. On social.tryfinanceme.local, each profile name appears in the HTML as: `<h3 class="profile-name"> Maria Chen </h3>` 

Extracting the usernames from the page: 

`curl -s http://social.tryfinanceme.local/ | grep -Po '(?<=<h3 class="profile-name">)[^<]+' > names.txt`

Normalizing the usernames into various possible username patterns: 

"firstname.lastname": `awk '{print tolower($1)"."tolower($2)}' names.txt > users_first.last.txt`

"firstinitial+lastname": `awk '{print tolower(substr($1,1,1))tolower($2)}' names.txt > users_flast.txt`

"firstname+lastinitial": `awk '{print tolower($1)tolower(substr($2,1,1))}' names.txt > users_firstl.txt`

`wc -l wordlist.txt`  to find the number of words in a wordlist.

