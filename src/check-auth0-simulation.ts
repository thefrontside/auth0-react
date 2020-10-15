const parseBoolean = (str = '') => {
  return str.toLowerCase() === 'true'
};
export const checkAuth0Simulation = () => parseBoolean(process.env.REACT_APP_SIMULATION);
