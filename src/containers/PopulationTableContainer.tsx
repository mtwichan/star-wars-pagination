import { Text, Spinner } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "../components/DataTable";

const columnHelper = createColumnHelper<any>();

const columnNames = [
  { key: 'name', header: 'Name' },
  { key: 'height', header: 'Height' },
  { key: 'mass', header: 'Mass' },
  { key: 'hair_color', header: 'Hair Color' },
  { key: 'skin_color', header: 'Skin Color' },
  { key: 'eye_color', header: 'Eye Color' },
  { key: 'birth_year', header: 'Birthyear' },
  { key: 'gender', header: 'Gender' },
];

const columns = columnNames.map(({ key, header }) =>
  columnHelper.accessor(key, {
    cell: (info) => info.getValue(),
    header,
  }),
);
export const PopulationTableContainer = ({ residenceEndPoints }) => {
  console.log("residenceEndPoints fired >>>", residenceEndPoints);
  const [data, setData] = useState([]);

  const { isFetching, error } = useQuery({
    queryKey: ["getResidences", residenceEndPoints],
    queryFn: async () => {
      const result = await Promise.all(
        residenceEndPoints.map((url) =>
          fetch(url).then((res, reject) => {
            if (!res.ok)
              return reject({
                error_type: "SERVER_ERROR",
                error: true,
                http_status: res.status,
              });
            return res.json();
          })
        )
      );
      console.log("result >>>", result);
      setData(result);
      return result;
    },
  });

  if (isFetching) {
    return <Spinner color="white" textAlign="center"/>
  }
  if (error) {
    return <>{`Error ... ${error}`}</>;
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
