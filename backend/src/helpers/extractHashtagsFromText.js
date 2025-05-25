// Removes the period at the end and converts to lower case
export const extractHashtagsFromText = (tag) => {
    if (typeof tag !== 'string') return '';
    return tag.replace(/[.,]$/, '').toLowerCase();
};

// Takes an array of hashtags, returns cleaned and unique ones
export const takeHashtags = (tags) => {
    const cleaned = tags
        .filter(v => typeof v === 'string' && v.startsWith('#'))
        .map(extractHashtagsFromText);
    return [...new Set(cleaned)];
};