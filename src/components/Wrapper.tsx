import React from "react";
import { Box } from "@chakra-ui/core/dist";

export type WrapperVariant = "small" | "regular";

interface wrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<wrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
