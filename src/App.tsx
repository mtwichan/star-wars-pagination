import { Flex, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";

import { ContentBox } from "./components/ContentBox";
import { PlanetTableContainer } from "./containers/PlanetTableContainer";
import { PlanetMetadataTableContainer } from "./containers/PlanetMetadataTableContainer";
import { PopulationTableContainer } from "./containers/PopulationTableContainer";


function App() {
  const [residenceEndPoints, setResidenceEndPoints] = useState<string[]>([]);
  const [planetMetadata, setPlanetMetadata] = useState<any>([]);

  return (
    <>
      <Box gap="2" px="10" py="5">
        <Heading py="7" color="yellow" size={{ sm: "xl", lg: "2xl" }} textAlign="center">
          👾 Star Wars Planetary Exploration 👾
        </Heading>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }} gap="2">
          <Box w={{ sm: "100%", md: "20%" }} h="75%">
            <ContentBox headingText="Select Planet 🪐">
              <PlanetTableContainer
                setPlanetMetadata={setPlanetMetadata}
                setResidenceEndPoints={setResidenceEndPoints}
              />
            </ContentBox>
          </Box>
          <Box
            display="flex"
            flexDir="column"
            gap="5"
            w={{ sm: "100%", md: "80%" }}
          >
            <ContentBox headingText="Planet Metadata ⛏">
              <PlanetMetadataTableContainer planetMetadata={planetMetadata} />
            </ContentBox>
            <ContentBox headingText="Inhabitants 👽">
              <PopulationTableContainer
                residenceEndPoints={residenceEndPoints}
              />
            </ContentBox>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default App;
