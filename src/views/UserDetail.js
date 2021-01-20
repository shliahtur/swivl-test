import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import Field from "../components/Field";
import Avatar from "../components/Avatar";

const UserDetail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state);

  const getData = () => {
    return (dispatch) => {
      dispatch(showLoading());
      axios
        .get(`https://api.github.com/users/${match.params.username}`)
        .then((res) => {
          dispatch({
            type: "GET_USER_DETAIL",
            payload: res.data,
          });
          setLoading(false);
          dispatch(hideLoading());
        })
        .catch((err) => {
          dispatch({
            type: "SHOW_ERROR",
            payload: "Error fetching detail info",
          });
          dispatch(hideLoading());
        });
    };
  };

  useEffect(() => {
    dispatch(getData());
  }, []);

  const backToList = () => {
    history.push("/", location.state);
  };
  let convertedDate = new Date(user.created_at);
  convertedDate = convertedDate.toLocaleDateString();
  return (
    <div className="user-wr">
      <button className="btn" onClick={backToList} style={{ display: "block" }}>
        back
      </button>
      <div className="user_avatar-wr">
        <Avatar loading={loading} src={user.avatar_url} />
      </div>
      <Field label="Login" loading={loading}>
        {user.login}
      </Field>
      <Field label="Name" loading={loading}>
        {user.name}
      </Field>
      <Field label="Created_at" loading={loading}>
        {convertedDate}
      </Field>
      <Field label="Followers" loading={loading}>
        {user.followers}
      </Field>
      <Field label="Following" loading={loading}>
        {user.following}
      </Field>
      <Field label="Company" loading={loading}>
        {user.company}
      </Field>
      <Field label="Email" loading={loading}>
        {user.email}
      </Field>
      <Field label="Location" loading={loading}>
        {user.location}
      </Field>
      <Field label="Blog" loading={loading}>
        {user.blog}
      </Field>
      <Field label="Bio" loading={loading}>
        {user.bio}
      </Field>
    </div>
  );
};
export default UserDetail;
