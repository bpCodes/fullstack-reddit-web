import React, {useState} from "react";
import {NextPage} from "next";
import {Form, Formik} from "formik";
import {toErrorMap} from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import {Box, Button, Flex, Link} from "@chakra-ui/core/dist";
import {useChangePasswordMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../../utils/createUrqlClient";
import NextLink from "next/link";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState("")
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: ''}}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if("token" in errorMap){
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New Password"
              label="New Password"
              type="password"
            />
            {tokenError && <Flex>
                <Box>{tokenError}</Box>
              <NextLink href="/forgot-password">
                <Link>Click here to get a new one</Link>
              </NextLink>
            </Flex>}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

ChangePassword.getInitialProps = ({query}) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);
