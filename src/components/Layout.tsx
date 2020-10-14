import React from "react";
import Wrapper, { WrapperVariant } from "./Wrapper";
import NavBar from "./NavBar";

interface layoutProps {
  variant?: WrapperVariant;
}

const Layout: React.FC<layoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
