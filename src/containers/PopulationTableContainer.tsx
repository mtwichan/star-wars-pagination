import { Text, Spinner } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "../components/DataTable";

interface Residence {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface PopulationTableContainerProps {
  residenceEndPoints: string[];
}

const columnHelper = createColumnHelper<Residence>();

const columnNames: { key: keyof Residence; header: string }[] = [
  { key: "name", header: "Name" },
  { key: "height", header: "Height" },
  { key: "mass", header: "Mass" },
  { key: "hair_color", header: "Hair Color" },
  { key: "skin_color", header: "Skin Color" },
  { key: "eye_color", header: "Eye Color" },
  { key: "birth_year", header: "Birthyear" },
  { key: "gender", header: "Gender" },
];

const columns = columnNames.map(({ key, header }) =>
  columnHelper.accessor(key as keyof Residence, {
    cell: (info) => info.getValue(),
    header,
  })
);
export const PopulationTableContainer: React.FC<
  PopulationTableContainerProps
> = ({ residenceEndPoints }) => {
  const [data, setData] = useState<Residence[]>([]);

  const { isFetching, error } = useQuery({
    queryKey: ["getResidences", residenceEndPoints],
    queryFn: async () => {
      if (residenceEndPoints.length <= 0) return [];
      const result: Residence[] = await Promise.all(
        residenceEndPoints.map((url) =>
          fetch(url).then((res: Response) => {
            if (!res.ok)
              return Promise.reject({
                error_type: "SERVER_ERROR",
                error: true,
                http_status: res.status,
              });
            return res.json();
          })
        )
      );
      setData(result);
      return result
    },
  });

  if (isFetching) {
    return <Spinner color="white" textAlign="center" />;
  }
  if (error) {
    return <>{`${String(error)}`}</>;
  }
  return (
    <>
      {residenceEndPoints.length > 0 ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <>
          <Text fontSize="lg" color="white">
            No inhabitants ... 🛸
          </Text>
        </>
      )}
    </>
  );
};
