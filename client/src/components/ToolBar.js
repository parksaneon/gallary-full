import React from "react";
import { Link } from "react-router-dom";

const ToolBar = () => {
  return (
    <>
      <Link to="/">
        <span>홈</span>
      </Link>
      <Link to="/auth/login">
        <span style={{ float: "right" }}>로그인</span>
      </Link>
      <Link to="/auto/register">
        <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
      </Link>
    </>
  );
};

export default ToolBar;
