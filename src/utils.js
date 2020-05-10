export const proxy = "http://localhost:4000";
//export const proxy = "http://70.52.81.229:4000";

export const generateId = (length) => {
  const chars = "qwertyuiopasdfghjklmnbvcxz";
  let id = "";
  for (let i = 0; i < length; i++) {
    const iChar = Math.floor(Math.random() * chars.length);
    id = id + chars[iChar];
  }
  return id;
};
