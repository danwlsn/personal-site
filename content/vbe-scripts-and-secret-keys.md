---
layout: post
title:  "I downloaded (and ran) a VBE script and ended up with someones Facebook and Google API keys"
date:   2019-02-01 
author: Dan Wilson
---

Let me set the scene; it’s late, I’m tired, and I want to download Friends but in Spanish. I hit the usually suspects but to no avail, so I try the second best ~~torrent~~ search engine there is: Google.

[Reddit to the rescue](https://www.reddit.com/r/spain/comments/2xgn0s/looking_for_spanish_torrent_trackers/). The top comment has three links, I open them all. Obviously, they’re all in Spanish, but I see that one has a search box on the home page. I put in what I’m looking for and BAM, loads of results. I select one of them, find my way to the download button and hit it. 

Download dialog pops up and I get lightly tickled with the first clue that something isn’t quite right. It’s a zip file. I’ve never downloaded a torrent file that came in a zip before but sure, I can roll with it. I unzip the package, double click the file inside and a weird nighties loading dialog comes up. Then nothing. I scroll the file explorer window a little bigger to reveal the file extension of what I just ran.

.vbe

SHIT. Instantly power off my machine and get on my Mac to investigate.

## The iFrame
I loaded the website up on my Mac and it was a different experience. It was riddled with ads and pop ups, which is a stark contrast what happened on my PC. Real strange. I open up developer tools and start digging. I notice scripts like `compatibility.js` being loaded from some nonsense CDN site. Maybe just some obscure and dodgy ad trackers. But then I see this iFrame. It has one element in it, a script tag with the source as a PHP file. [Here it is](www.megdexchange.com/a/display.php?r=1974559). 

## JS in PHP
Now this is where the story got interesting for me, but when I cracked it, turned out to be just an ad. BUT THE STORY MUST GO ON. I originally thought this was a dodgy script that was looking at your browser user agent and opening an iFrame if you’re running an older browser. Turns out, it’s just serving an ad to browsers that would support it.

## Typos in code
Typos in code aren’t really a big deal. If I have the variable mstake, as long as I keep referring to it as mstake then my code will run fine. What typos aren’t good for, is hiding identity. The script has a couple of comment in it, one of which had a spelling mistake in it, so I decided to search for it and see what comes back. [Here’s a link to the results](https://duckduckgo.com/?q=%22Parse+the+passed+user+agent+if+possible+so+we+can+descide+what+we+are+going+to+do.%22&t=hj&ia=web). We can see a couple of forum posts with people complaining, a bunch of other ad networks that are using the same script. But my favourite result is [this one](https://gist.github.com/yukirafsanjani/d16a0b604fa57986eae64f0273fd8089). The same script but in a gist..

## Secrets are secret
I thought I’d had them. I thought this was it. I was Liam Neeson, and I found them. I crawled their GitHub to see what I could find. They have two gists with API secrets in them. I was able to get an access_token back from Facebooks API using them, but it turned out to be invalid (probably because these gists are years old). 

And that’s really where it ends. I was bummed to find that it was just trying to serve an ad. But I guess there’s a couple of points to this story:

1) Don’t put keys and secret in Gist. Be careful with that shit.
2) Why are ad networks serving ads in such a suspicious way. We’re really living in the new Wild West. Where ad companies are loading javascript through PHP in iFrames. I mean, come the fuck on.

Also still unanswered, there’s a couple of files (including an .exe) still on my PC. So someone did try something dodgy. I’m just not capable of actually tracking them down. Maybe that’s point number three.
