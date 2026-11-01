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

CeWL is a web crawler that scrapes words from websites and builds custom wordlists useful for password attacks.

 `cewl -d 2 -m 6 --lowercase -w keywords.txt http://ip:port`

- `-d 2`: Crawl depth of 2.
- `-m 6`: Minimum word length.
- `--lowercase`: Convert words to lowercase.
- `-w keywords.txt`: Save output to file.

