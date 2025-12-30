export const toLocalDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export const toLocalTime = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export const toCapitalize = (val: string = '') => {
    val = val.toLowerCase()
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const toTitleCase = (val: string = ''): string => {
    return val
        .toLowerCase()
        .split(' ')
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ')
}

export const getInitial = (name: string) => {
  const words = name.trim().split(" ");
  return words.length > 1
    ? words[0][0] + words[1][0]
    : words[0][0];
}

export const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
