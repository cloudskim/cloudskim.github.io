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

Beyond `msfconsole` and its modules, the framework ships with a set of standalone command-line tools. The most important one for this module is `msfvenom`, which generates payloads outside of `msfconsole` for use in scenarios where you need a standalone file (an executable, a web shell, or raw shellcode). 

## The Exploit Chain: Vulnerability, Exploit, Payload

### The Seven Module Categories

Metasploit organizes its entire library into seven categories of modules. Each category serves a distinct role in the penetration testing workflow.

1. **Exploits**

Exploit modules target a specific vulnerability on a specific platform. They are organized by target operating system and service (e.g., exploits/windows/smb/, exploits/linux/http/). With over 2,600 exploit modules in the current framework, this is the largest category. When you hear someone say "I used a Metasploit module," they are almost always referring to an exploit.

2. **Auxiliary**

Auxiliary modules handle everything that is not direct exploitation. This includes port scanners, service fingerprinters, brute-force login modules, fuzzers, and network sniffers. If you need to gather information about a target or test credentials without delivering an exploit, you are looking for an auxiliary module. We will use several of these in the next room when we scan Stratford Systems' network.

3. **Payloads**

Payload modules contain the code that executes on the target after a successful exploit. Metasploit ships nearly 1,700 payload modules covering a wide range of operating systems, architectures, and connection methods. We will look at the different payload types (singles, stagers, and stages) in a moment.

4. **Post-Exploitation**

Post modules run after you have already gained access to a target through an active session. They automate common post-exploitation tasks: dumping password hashes, enumerating system information, capturing screenshots, pivoting to other network segments, and more. These modules are organized by target OS (e.g., post/windows/gather/, post/linux/manage/). We will use them extensively in the Post-Exploitation room.

5. **Encoders**

Encoder modules transform payload data into a different format. The most well-known encoder is x86/shikata_ga_nai, which applies polymorphic XOR encoding. An important clarification: encoding is not encryption, and it is not a reliable antivirus evasion technique on its own. Modern endpoint detection solutions look far beyond simple signature matching. Encoders still have legitimate uses (removing bad characters from shellcode, for example), but treating them as a stealth mechanism is a common beginner misconception. We will discuss this honestly in the Payload Generation room.

6. **NOPs**

NOP (No Operation) modules generate NOP sleds, sequences of instructions that do nothing. On x86 processors, the classic NOP instruction is 0x90, which tells the CPU to skip to the next instruction. NOP sleds serve as padding to ensure payloads land at predictable memory addresses during buffer overflow exploitation. You will rarely interact with NOP modules directly; Metasploit handles NOP sled generation automatically when needed.

7. **Evasion**

Evasion modules are purpose-built attempts to bypass specific security controls, such as Windows Defender or AppLocker. Unlike encoders (which simply re-encode data), evasion modules implement actual evasion techniques like process herpaderping or living-off-the-land binary abuse. This is the smallest module category, currently containing around a dozen modules. Their effectiveness varies and depends heavily on the target environment's security configuration.

### Payload Types: Singles, Stagers, and Stages

Within the payload category, Metasploit distinguishes between three types. This is a brief conceptual introduction.

**Singles** (also called inline payloads) are self-contained. The entire payload is delivered in a single package. A single payload might add a user account, execute a system command, or open a bind shell. Because everything is in one piece, singles tend to be larger but more reliable; there is no second download that could fail or be blocked.

**Stagers** are small, lightweight payloads whose only job is to establish a communication channel between the attacker and the target. Once connected, the stager downloads the second component.

**Stages** are the larger payload components downloaded by a stager. Together, a **stager** and its **stage** form a **staged payload**. The advantage is a smaller initial footprint; the disadvantage is that the connection must remain stable long enough for the stage to download.

### Reading the Naming Convention

Metasploit uses the payload's path to tell you whether it is staged or single. The separator between the shell type and the connection method is the key:

`windows/x64/shell_reverse_tcp` — The underscore (_) between shell and reverse means this is a single (stageless) payload. Everything is in one package.

`windows/x64/shell/reverse_tcp` — The forward slash (/) between shell and reverse means this is a staged payload. A small stager connects first, then downloads the full shell stage.

## Setting Up msfconsole

### Becoming the postgres user

```
root@magnolia:# su postgres
```

### Creating a database user

```
postgres@magnolia:$ createuser msf_user -P
Enter password for new role: yourmsfpassword
Enter it again: yourmsfpassword 
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n
```

### Creating a database

```
postgres@magnolia:$ createdb --owner=msf_user msf_database
```

sudo -u postgres psql

pass12345

login as msf_user: `psql -h 127.0.0.1 -p 5433 -U msf_user -d msf_database`

`sudo apt install metasploit-framework`

We will cover `msfvenom` in depth in the fourth room of this module. Other tools like `pattern_create` and `pattern_offset` are used in exploit development, which is beyond the scope of this Learning Path.

