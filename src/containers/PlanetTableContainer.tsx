import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { PaginatedDataTable } from "../components/PaginatedDataTable";
import { SwapiAPI } from "../services/swapi";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";

interface Planet {
  name: string;
  residents: string[];
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
}

interface PlanetTable {
    planet: string;
}

interface PlanetTableContainerProps {
  setResidenceEndPoints: (residenceEndPoints: string[]) => void;
  setPlanetMetadata: (metadata: Planet[]) => void;
}

const columnHelper = createColumnHelper<PlanetTable>();

const columns = [
  columnHelper.accessor("planet", {
    cell: (info) => info.getValue(),
    header: "",
  }),
];

export const PlanetTableContainer: React.FC<PlanetTableContainerProps> = ({
  setResidenceEndPoints,
  setPlanetMetadata,
}) => {
  const [data, setData] = useState<PlanetTable[]>([]);
  const [planetData, setPlanetData] = useState<Planet[] | never[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetTable | undefined>(undefined);
  const [page, setPagination] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);

  // Get planets and set the initial state
  const { error, isFetching } = useQuery({
    queryKey: ["getPlanets", page],
    queryFn: async () => {
      const result: {count: number, results: Planet[]} = await SwapiAPI.getPlanets(page);

      const planetData: Planet[] = result?.results;
      const tableData = planetData.map((res: {name: string}) => {
        return { planet: res.name };
      });

      // Set max page initially
      if (maxPage === undefined) {
        setMaxPage(result.count / 10);
      }

      setPlanetData(planetData);
      setData(tableData);
      return result;
    },
    keepPreviousData: true,
  });

  // Set residence end points & planet metadata when new planet selected
  useEffect(() => {
    if (selectedPlanet == null) {
      return;
    }
    const selectedPlanetData = planetData.find((planet) => {
      return planet.name === selectedPlanet.planet;
    });

    const residenceEndPoints = selectedPlanetData?.residents;
    setResidenceEndPoints(residenceEndPoints ? residenceEndPoints : []);
    setPlanetMetadata(selectedPlanetData ? [selectedPlanetData] : []);
  }, [selectedPlanet]);

  if (isFetching) {
    return (
      <>
        <Stack>
          {[...Array(10)].map((_, idx) => {
            return <Skeleton key={idx} height="40px" borderRadius="10px" />;
          })}
          <Box height="25px" />
          <Skeleton height="30px" />
        </Stack>
      </>
    );
  }

  if (error) {
    return <>Error occured ...</>;
  }

  return (
    <>
      <>
        <PaginatedDataTable
          data={data}
          columns={columns}
          page={page}
          maxPage={maxPage}
          setSelectedRow={setSelectedPlanet}
          setPagination={setPagination}
        />
      </>
    </>
  );
};
