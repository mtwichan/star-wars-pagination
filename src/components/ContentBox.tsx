import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContentBoxProps {
  children: ReactNode;
  headingText: string;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  headingText,
}) => {
  return (
    <Box
      background="mediumpurple"
      borderRadius="10px"
      p="15px"
      border="5px solid black"
      h="100%"
    >
      <Heading fontSize="2xl" color="yellow" py="1" textAlign="left">
        {headingText}
      </Heading>
      {children}
    </Box>
  );
};
