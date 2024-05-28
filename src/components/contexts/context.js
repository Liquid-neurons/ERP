import React, { createContext, useState, useContext } from "react";

// Create context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  // Load user's email and role from session storage on component mount
  const [userEmail, setUserEmailState] = useState(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    return storedEmail || "";
  });

  const [userRole, setUserRoleState] = useState(() => {
    const storedRole = sessionStorage.getItem('userRole');
    return storedRole || "";
  });

  const setUserEmail = (newEmail) => {
    setUserEmailState(newEmail);
    sessionStorage.setItem('userEmail', newEmail);
  };

  const setUserRole = (newRole) => {
    setUserRoleState(newRole);
    sessionStorage.setItem('userRole', newRole);
  };

  const resetUser = () => {
    setUserEmail("");
    setUserRole("");
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
  };

  return (
    <UserContext.Provider value={{ userEmail, userRole, setUserEmail, setUserRole, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
