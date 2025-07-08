import { Link } from 'react-router-dom';

const stripEndingPunctuation = (str = '') => {
  const match = str.match(/^(.+?)([.,)(])?$/);
  return {
    core: match?.[1] || str,
    punctuation: match?.[2] || '',
  };
};

const formatDisplayUrl = (url) => {
  try {
    const parsed = new URL(url);

    // remove display - www.
    let host = parsed.host.replace(/^www\./, '');
    let pathname = parsed.pathname;

    // remove trailing slash display
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    return host + pathname;
  } catch (e) {
    return url;
  }
};


export const formatLinksInText = (text = '') => {
  const lines = text.split(/\r?\n/);

  const formatted = lines.flatMap((line, lineIndex) => {
    const words = line.split(/\s+/);
    const jsxWords = words.map((str, wordIndex) => {
      const { core, punctuation } = stripEndingPunctuation(str);

      if (core.startsWith('#')) {
        const tag = core.slice(1);
        return (
          <span key={`tag-${lineIndex}-${wordIndex}`}>
            <Link to={`/hashtags/${tag}`}>#{tag}</Link>{punctuation + ' '}
          </span>
        );
      }

      if (core.startsWith('http://') || core.startsWith('https://')) {
        return (
          <span key={`link-${lineIndex}-${wordIndex}`}>
            <Link
              to={core}
              target="_blank"
              rel="noreferrer noopener"
            >
              {formatDisplayUrl(core)}
            </Link>{punctuation + ' '}
          </span>
        );
      }

      return str + ' ';
    });

    return lineIndex < lines.length - 1
      ? [...jsxWords, <br key={`br-${lineIndex}`} />]
      : jsxWords;
  });

  return formatted;
};
