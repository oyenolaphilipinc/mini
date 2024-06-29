import { useEffect, useState } from "react";
import { getUserData } from "@/helper-functions/getUser";

function useUserData(userId, firstName, referralId) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        if (!firstName) return;
        const data = await getUserData(userId, firstName, referralId);
        if (!data) return;
        setUserData(data);
        setName(firstName);
        setIsLoading(false);
      } catch (error) {
        console.log("useUserData", error);
      }
    })();

    return () => {};
  }, [userId, firstName, referralId]);

  return { isLoading, userData, name };
}

export { useUserData };
