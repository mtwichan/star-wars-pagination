import { Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "../components/DataTable";
import { Planet } from "../utils/types";

interface PlanetMetadataTableContainerProps {
  planetMetadata: Planet[];
}

const columnHelper = createColumnHelper<Planet>();

const columnNames: {key: keyof Planet; header: string}[] = [
  { key: 'climate', header: 'Climate' },
  { key: 'diameter', header: 'Diameter' },
  { key: 'gravity', header: 'Gravity' },
  { key: 'name', header: 'Name' },
  { key: 'orbital_period', header: 'Orbital Period' },
  { key: 'population', header: 'Population' },
  { key: 'rotation_period', header: 'Rotation Period' },
  { key: 'surface_water', header: 'Surface Water' },
  { key: 'terrain', header: 'Terrain' },
];

const columns = columnNames.map(({ key, header }) =>
  columnHelper.accessor(key as keyof Planet, {
    cell: (info) => info.getValue(),
    header,
  }),
);

export const PlanetMetadataTableContainer: React.FC<
  PlanetMetadataTableContainerProps
> = ({ planetMetadata }) => {
  return (
    <>
      {planetMetadata.length > 0 ? (
        <DataTable data={planetMetadata} columns={columns} />
      ) : (
        <>
          <Text fontSize="lg" color="white">
            No planet metadata ...
          </Text>
        </>
      )}
    </>
  );
};
