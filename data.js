export const WALKTHROUGHS = {
    python: {
      title: "Safe Collection Mutation",
      subtitle: "How to remove items while iterating without breaking the loop.",
      sections: [
        {
          id: "py-1",
          type: "text",
          content: "Iterating over a list while removing elements is a classic trap. Since Python's iterator relies on indices, removing an item shifts everything left, causing the next item to be skipped entirely.",
          explanation: "This logic is often found in data cleaning scripts. It's the difference between a bug that skips half your data and a script that actually works."
        },
        {
          id: "py-2",
          type: "code",
          language: "python",
          content: `def purge_expired(items):\n    # The [:] creates a shallow copy\n    for item in items[:]:\n        if item.is_expired():\n            items.remove(item)\n    return items`,
          explanation: "Notice the [:] syntax. By iterating over a copy but modifying the original, your loop pointer remains safe from shifts."
        },
        {
          id: "py-3",
          type: "code",
          language: "python",
          content: `import re\n\ndef clean_emails(raw_list):\n    # Using list comprehension with a regex filter\n    regex = r'^[a-z0-9.]+@example\\.com$'\n    return [e.lower() for e in raw_list if re.match(regex, e, re.I)]`,
          explanation: "The re.I flag makes the match case-insensitive. This keeps your regex string clean and readable while handling chaotic user input."
        }
      ]
    },
    c: {
      title: "Low-Level Resilience",
      subtitle: "Managing heap memory with defensive patterns.",
      sections: [
        {
          id: "c-1",
          type: "code",
          language: "c",
          content: `char *buffer = (char *)malloc(512 * sizeof(char));\nif (buffer == NULL) {\n    fprintf(stderr, "Fatal: Out of memory\\n");\n    exit(EXIT_FAILURE);\n}`,
          explanation: "Never trust malloc. In long-running systems, memory fragmentation is real. This 3-line check prevents silent crashes down the line."
        },
        {
          id: "c-2",
          type: "code",
          language: "c",
          content: `// Logic execution...\n\nfree(buffer);\nbuffer = NULL;`,
          explanation: "Setting the pointer to NULL after free is a 'monk-like' habit. It ensures that if you accidentally free it again, the system just ignores it safely."
        }
      ]
    }
  };
  