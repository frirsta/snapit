import { axiosRequest } from "../axios";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosRequest.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (user, profile, following_id) => {
  return user.id === profile.id
    ? {
        ...user,
        follower_count: user.follower_count + 1,
        following_id,
      }
    : user.is_owner
    ? {
        ...user,
        following_count: user.following_count + 1,
      }
    : user;
};

export const unfollowHelper = (user, profile) => {
  return user.id === profile.id
    ? {
        ...user,
        follower_count: user.follower_count - 1,
        following_id: null,
      }
    : user.is_owner
    ? { ...user, following_count: user.following_count - 1 }
    : user;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
