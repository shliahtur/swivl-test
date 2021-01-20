import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";

const useUsersFetch = (pageNumber) => {
  const perPage = 30;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getData = () => {
    return (dispatch) => {
      dispatch(showLoading());
      axios
        .get("https://api.github.com/users", {
          params: {
            per_page: perPage,
            since: pageNumber * perPage,
          },
        })
        .then((res) => {
          dispatch({
            type: "GET_USER_LIST",
            payload: res.data,
          });
          setLoading(false);
          dispatch(hideLoading());
        })
        .catch((err) => {
          dispatch({
            type: "SHOW_ERROR",
            payload: "Error fetching user list",
          });
          dispatch(hideLoading());
        });
    };
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getData());
  }, [pageNumber]);
  return { loading };
};
export default useUsersFetch;
