---
title: "Template: every feature in one writeup"
subtitle: Copy this post, delete what you do not need, and replace the text with your own
tags:
  - template
  - writeup
image: /assets/images/sample.svg
---
## 1. Text formatting

You can write **bold**, *italic*, ***both***, and `inline code` for commands, file names and flags. Use inline code for things like `/etc/passwd` or `nmap -sV`.

A footnote looks like this.[^1] Write the note itself at the bottom of the post.

## 2. Links

A normal link inside a sentence: read the [GitHub documentation](https://docs.github.com) for more.

Or leave only the link, and the title, description and thumbnail are looked up automatically:

[https://github.com](https://github.com)

## 3. Images

Upload images in the CMS (or put them in `assets/images/`) and add them with the image button. A plain image:

![A short description of the image](/assets/images/sample.svg)

An image with a caption (switch to code view for this one):



![Sample figure](/assets/images/sample.svg)

Figure 1. Caption describing what the reader is looking at.



## 4. Video and music

A YouTube link on its own line turns into a player. Add `?t=30` to start at 30 seconds.

[https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

Spotify links work the same way (tracks, albums, playlists, episodes). Paste the link on its own line, like this:

[https://open.spotify.com/track/6Ca48UTggzmfqE45NrzDm5?si=f2bfbb0e40bf4c89](https://open.spotify.com/track/6Ca48UTggzmfqE45NrzDm5?si=f2bfbb0e40bf4c89](https://open.spotify.com/track/6Ca48UTggzmfqE45NrzDm5?si=f2bfbb0e40bf4c89))

For a video file you uploaded yourself, use this in code view:

```html

<video controls src="/assets/images/demo.mp4"></video>

```

## 5. Code

Use a fenced block and name the language for colouring:

```
nmap -sC -sV -oN scan.txt 10.10.10.10
```

## 6. Quotes and callouts

> Write down what you learned while it is still fresh.

## 7. Lists

A typical writeup structure:

1. Recon
2. Foothold
3. Privilege escalation
4. Lessons learned

## 8. Tables


| Port | Service | Notes |
| ---- | ------- | ------------- |
| 22 | SSH | Key auth only |
| 80 | HTTP | Outdated CMS |
| 3306 | MySQL | Local only |


---

## Summary

End with the key takeaways: what worked, what did not, and what you would do differently. Tags at the bottom of the post and the older/newer links are added automatically.

[^1]: Footnotes appear here, linked back to the place they were mentioned.

