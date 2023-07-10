const checkAuth = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export default checkAuth;
