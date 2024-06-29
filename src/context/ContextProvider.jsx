import { createContext, useContext, useState } from "react";
import { useUserData } from "@/hooks/useUserdata";
import { updateUserData } from "@/helper-functions/getUser";

const Context = createContext({});

function ContextProvider({ userId, firstName, referralId, children }) {
  const [floatingEnergy, setFloatingEnergy] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [tappingEnergy, setTappingEnergy] = useState(0);
  const [tappingPower, setTappingPower] = useState(0);

  const [screenAxis, setScreenAxis] = useState([]);

  const { isLoading, userData, name } = useUserData(userId, firstName, referralId);

  const handleTap = async (clientX, clientY) => {
    if (!userId) return;
    if (floatingEnergy - tappingPower <= 0) return;
    setFloatingEnergy((curr) => curr - tappingPower);
    setCoinsEarned((coins) => coins + tappingPower);
    setScreenAxis((prv) => [...prv, { x: clientX, y: clientY, id: Date.now() }]);

    await updateUserData(userId, {
      coinsEarned: coinsEarned + 5,
      floatingTapEnergy: floatingEnergy - 5,
    });
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        floatingEnergy,
        coinsEarned,
        tappingEnergy,
        tappingPower,
        userId,
        screenAxis,
        name,
        handleTap,
        userData,
        setTappingEnergy,
        setTappingPower,
        setScreenAxis,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useProvider() {
  const context = useContext(Context);
  return context;
}

export { ContextProvider, useProvider };
