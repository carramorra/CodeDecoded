export function highlight(text, language) {
    // Escape HTML
    let result = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  
    // Regex patterns for syntax highlighting
    const keywords = /\b(def|return|for|in|if|import|else|while|class|char|int|void|sizeof|fprintf|free|malloc|NULL|exit|EXIT_FAILURE)\b/g;
    const strings = /(['"].*?['"])/g;
    const comments = /(#.*|\/\/.*)/g;
  
    result = result
      .replace(keywords, '<span class="text-indigo-600 font-semibold">$1</span>')
      .replace(strings, '<span class="text-teal-600 font-medium">$1</span>')
      .replace(comments, '<span class="text-zinc-400 italic">$1</span>');
  
    return result;
  }
  