const checkAuth = () => {
  const user = localStorage.getItem("user");
  console.log(user);
  return user ? true : false;
};

export default checkAuth;
