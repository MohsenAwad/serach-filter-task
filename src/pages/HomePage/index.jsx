import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { debounce } from "lodash";
import services from "../../services";

import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import GenderSelect from "../../components/GenderSelect";
import DatePickerFilter from "../../components/DatePicker";

import "./HomePage.scss";

const HomePage = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const debouncedSetSearchValue = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearchValue(value);
      }, 1000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, [debouncedSetSearchValue]);

  const usersList = useMemo(() => {
    let filteredData = usersData;

    if (debouncedSearchValue) {
      const newData = filteredData?.filter(
        (item) =>
          item.firstName
            ?.toLowerCase()
            ?.includes(debouncedSearchValue?.toLocaleLowerCase()) ||
          item.lastName
            ?.toLowerCase()
            ?.includes(debouncedSearchValue?.toLocaleLowerCase())
      );
      filteredData = newData;
    }

    if (selectedGender) {
      filteredData = filteredData.filter(
        (item) => item.gender === selectedGender.value
      );
    }

    if (startDate && endDate) {
      const startYear = moment(startDate).year();
      const endYear = moment(endDate).year();

      filteredData = filteredData.filter((item) => {
        const userBirthYear = moment(item.birthDate, "YYYY-M-D").year();
        return userBirthYear >= startYear && userBirthYear <= endYear;
      });
    }

    return filteredData;
  }, [usersData, debouncedSearchValue, startDate, endDate, selectedGender]);

  const usersColumns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "fullName",
        cell: ({ row }) =>
          `${row.original.firstName} ${row.original.lastName || ""}`,
      },
      {
        header: "Gender",
        accessorKey: "gender",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Date of Birth",
        accessorKey: "dateOfBirth",
        cell: ({ row }) => {
          const birthDate = row.original.birthDate;

          return moment(birthDate, "YYYY-M-D").format("DD / MMM / YYYY");
        },
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    []
  );

  const getUsersData = async () => {
    try {
      const res = await services.homePage.getUsersData();
      setUsersData(res?.data?.users ?? []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="home-page-container">
      {isLoading ? (
        <div className="home-page-container__loading">Loading...</div>
      ) : (
        <div className="home-page-container__content">
          <div className="home-page-container__filters-wrapper">
            <SearchInput
              value={searchValue}
              handleOnChange={(value) => {
                setSearchValue(value);
                debouncedSetSearchValue(value);
              }}
            />
            <GenderSelect
              value={selectedGender}
              handleOnChange={(value) => {
                setSelectedGender(value);
              }}
            />
            <DatePickerFilter
              startDate={startDate}
              endDate={endDate}
              handleOnChange={([newStartDate, newEndDate]) => {
                setStartDate(newStartDate);
                setEndDate(newEndDate);
              }}
            />
          </div>

          <Table columns={usersColumns} data={usersList} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
