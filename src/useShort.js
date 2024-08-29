export const useShort = (name) => {
    const [first, last] = name.split(" ");
    const initials = last ? first[0] + last[0] : first.slice(0, 2);
    return initials.toUpperCase();
  };
  