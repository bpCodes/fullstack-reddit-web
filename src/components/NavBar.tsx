import React from "react";
import {Box, Button, Flex, Link} from "@chakra-ui/core/dist";
import NextLink from "next/link"
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import {isServer} from "../utils/isServer";

interface navBarProps {

}

const NavBar: React.FC<navBarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{data, fetching}] = useMeQuery({
    pause: isServer()
  });
  let body = null;

  if(fetching){
    body = (
      <>
        loading
      </>
    )
  } else if(!data?.me){
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button onClick={() => logout()} isLoading={logoutFetching} variant="link">Logout</Button>
      </Flex>
    )
  }
  return (
    <Flex bg="tomato" p={4} >
      <Box ml="auto">
        {body}
      </Box>
    </Flex>
  );
}

export default NavBar;
