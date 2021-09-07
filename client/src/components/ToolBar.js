import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await axios.patch(
        "/user/logout",
        {},
        { headers: { sessionid: me.sessionId } }
      );
      setMe();
      toast.success("로그아웃!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link to="/">
        <span>홈</span>
      </Link>
      {me ? (
        <span onClick={logoutHandler} style={{ float: "right" }}>
          로그아웃({me.name})
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span style={{ float: "right" }}>로그인</span>
          </Link>
          <Link to="/auto/register">
            <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
          </Link>
        </>
      )}
    </>
  );
};

export default ToolBar;
