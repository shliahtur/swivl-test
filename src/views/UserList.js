import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUsersFetch from "../hooks/useUsersFetch";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

const UserList = () => {
  const history = useHistory();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(0);
  const { loading } = useUsersFetch(pageNumber);
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const observer = useRef();
  useEffect(() => {  // Scroll to selected user row
    const item = document.querySelector(".user-" + location.state);
    if (item) {
      item.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
      item.classList.add("visited");
      setTimeout(() => item.classList.remove("visited"), 2000);
    }
  }, []);

  const lastUserRef = useCallback((node) => {   // Infinite scrolling
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  });

  const openUserDetail = (id, login) => {
    dispatch({
      type: "GET_USER_DETAIL",
      payload: users.find((x) => x.id === id),
    });

    history.push(`/user/${login}`, id); // passing id via location to scroll back
  };
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Login</th>
          <th>URL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((el, index) => {
            return (
              <tr
                key={el.id}
                ref={users.length === index + 1 ? lastUserRef : null} 
                onClick={() => openUserDetail(el.id, el.login)}
                className={`user-${el.id}`}
              >
                <td>{el.login}</td>
                <td>
                  <Link
                    hint="Enter"
                    to={{ pathname: el.html_url }}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="user-url"
                  >
                    {el.html_url}
                  </Link>
                </td>
                <td>
                  <Avatar src={el.avatar_url} small />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default UserList;
