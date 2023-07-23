import { createContext, useContext, useEffect, useState } from "react";
import { axiosRequest, axiosResponse } from "../axios";
import { followHelper, unfollowHelper } from "../utils/utils";
import { useCurrentUser } from "./UserContext";

export const UserDataContext = createContext();
export const SetUserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);
export const useSetUserData = () => useContext(SetUserDataContext);

export const UserDataProvider = ({ children }) => {
  const [UserData, setUserData] = useState({
    profilePage: { results: [] },
    exploreAccounts: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (account) => {
    try {
      const { data } = await axiosResponse.post("/followers/", {
        follower: account.id,
      });
      setUserData((prevState) => ({
        ...prevState,
        profilePage: {
          results: prevState.profilePage.results.map((user) =>
            followHelper(user, account, data.id)
          ),
        },
        exploreAccounts: {
          ...prevState.exploreAccounts,
          results: prevState.exploreAccounts.results.map((user) =>
            followHelper(user, account, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (account) => {
    try {
      await axiosResponse.delete(`followers/${account.following_id}`);

      setUserData((prevState) => ({
        ...prevState,
        profilePage: {
          results: prevState.profilePage.results.map((user) =>
            unfollowHelper(user, account)
          ),
        },
        exploreAccounts: {
          ...prevState.exploreAccounts,
          results: prevState.exploreAccounts.results.map((user) =>
            unfollowHelper(user, account)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleData = async () => {
      try {
        const { data } = await axiosRequest.get(
          "/followers/?ordering=-follower_count"
        );
        setUserData((prevState) => ({
          ...prevState,
          exploreAccounts: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    handleData();
  }, [currentUser]);

  return (
    <UserDataContext.Provider value={UserData}>
      <SetUserDataContext.Provider
        value={{ setUserData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetUserDataContext.Provider>
    </UserDataContext.Provider>
  );
};
