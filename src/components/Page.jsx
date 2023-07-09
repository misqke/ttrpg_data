import React, { useState, useEffect } from "react";
import checkAuth from "../../utils/auth";
import { useRouter } from "next/router";

const Page = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = checkAuth();
    if (!auth) {
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col p-4">
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      ) : (
        children
      )}
    </div>
  );
};

export default Page;
