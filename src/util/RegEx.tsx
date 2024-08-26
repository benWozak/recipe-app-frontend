// Regular expression for general URL validation
export const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Regular expression for Instagram profile or post URL
export const instagramRegex =
  /^(https?:\/\/)?(www\.)?instagram\.com\/(p\/[\w-]+\/?|[\w\.-]+\/?$)/;
