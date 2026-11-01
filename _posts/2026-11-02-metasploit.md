---
title: Metasploit
subtitle: This is guide for metasploit
---
Metasploit is a framework: a structured toolkit that organizes thousands of known exploits, pairs them with the right payloads, and gives you a consistent interface to configure, launch, and manage attacks across an entire network.

You would not build a house with a single hammer; you need saws, drills, levels, measuring tapes, and fasteners, all organized so you can find the right tool for each job. Metasploit works the same way. Instead of forcing you to hunt for individual exploit scripts scattered across the internet, it provides a centralized library of exploits, scanners, payloads, and post-exploitation tools, all accessible through a single command-line interface called `msfconsole`.

## **The Three Pillars of the Framework**

The Metasploit Framework is built around three core components. Understanding what each one does will help you navigate the tool effectively as we move through the remaining tasks.

**1. Msfconsole**

`msfconsole` is the primary command-line interface for the Metasploit Framework. It is where you will spend the vast majority of your time. From `msfconsole`, you can search for modules, configure parameters, launch exploits, and manage sessions on compromised targets. Consider it the cockpit of the framework; everything else is accessed through it.

**2. Modules**

Modules are the building blocks of Metasploit. Each module is a self-contained piece of code designed to perform a specific task. There are seven categories of modules (exploits, auxiliary, payloads, post-exploitation, encoders, NOPs, and evasion), and we will explore each of these in the next task. For now, the key takeaway is that Metasploit's power comes from its library of thousands of modules, not from any single tool.

**3. Tools**

Beyond `msfconsole` and its modules, the framework ships with a set of standalone command-line tools. The most important one for this module is `msfvenom`, which generates payloads outside of `msfconsole` for use in scenarios where you need a standalone file (an executable, a web shell, or raw shellcode). We will cover `msfvenom` in depth in the fourth room of this module. Other tools like `pattern_create` and `pattern_offset` are used in exploit development, which is beyond the scope of this Learning Path.