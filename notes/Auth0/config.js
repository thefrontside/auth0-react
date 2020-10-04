const parseBoolean = (str) => str.toLowerCase() === "true";
export const ENABLE_SIMULATION = () => parseBoolean(process.env.REACT_APP_BIGTEST);