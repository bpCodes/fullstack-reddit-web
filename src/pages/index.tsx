import {withUrqlClient} from 'next-urql';
import {createUrqlClient} from "../utils/createUrqlClient";
import {Box, Flex, Heading, Link, Stack, Text} from "@chakra-ui/core/dist";
import React from "react";
import {usePostsQuery} from "../generated/graphql";
import Layout from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 4
    }
  })

  return (
    <Layout>
      <Flex>
        <Heading>Reddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">
            Create Post
          </Link>
        </NextLink>
      </Flex>
      <Stack spacing={8}>
        {data && data.posts.map(p => (
          <Box p={5} key={p.id} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
        ))}
      </Stack>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Index)
