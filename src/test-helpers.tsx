export const setUser = (username: string, password: string) => {
  localStorage.setItem('user', JSON.stringify({
    username,
    password
  }))
};

