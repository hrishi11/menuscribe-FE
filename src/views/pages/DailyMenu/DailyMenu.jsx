import React, { useEffect, useState } from "react";
import Detail from "../ResturantDetails/Detail/Detail";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  getPackagesWithoutLoginByVendorId,
  getResturantDetails,
} from "../../../actions/customerReducer/CustomerActions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./DailyMenu.css";
import PackageItem from "./PackageItem/PackageItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation, Link } from "react-router-dom";

const DailyMenu = () => {
  const { resturantPublicUrl } = useParams();
  const [resturantDetails, setResturantDetails] = useState({});
  const [packages, setPackages] = useState([]);
  const [alignment, setAlignment] = useState(0);
  const [sixDays, setSixDays] = useState([]);
  const dispatch = useDispatch();

  const fetchResturantDetails = async () => {
    try {
      const res = await dispatch(getResturantDetails({ resturantPublicUrl }));
      setResturantDetails(res.data);
    } catch (error) {
      console.error("Error fetching Resturant Details:", error);
    }
  };
  useEffect(() => {
    fetchResturantDetails();
  }, []);

  const fetchPackages = async () => {
    try {
      const [packagesResponse] = await Promise.all([
        dispatch(
          getPackagesWithoutLoginByVendorId({
            vendor_id: resturantDetails.id,
          })
        ),
      ]);
      console.log("resutdetail", packagesResponse);

      setPackages(packagesResponse ? packagesResponse?.data : []);
      setAlignment(packagesResponse ? packagesResponse?.data[0].id : 0);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    if (resturantDetails.id) {
      fetchPackages();
    }
  }, [resturantDetails]);

  const handleChange = (event, newAlignment) => {
    // console.log(newAlignment);
    setAlignment(newAlignment);
  };

  function getNextSixDays() {
    if (alignment === 0) return [];
    const selectedPackage = packages.find((pack) => pack.id === alignment);
    packages.find((pack) => pack.id === alignment);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const nextSixDays = [];
    const today = new Date();
    let count = 0;

    // Checking if the package is not available for any of the 7 days then return and don't create date array
    if (
      selectedPackage?.sat === 0 &&
      selectedPackage?.sun === 0 &&
      selectedPackage?.mon === 0 &&
      selectedPackage?.tue === 0 &&
      selectedPackage?.wed === 0 &&
      selectedPackage?.thu === 0 &&
      selectedPackage?.fri === 0
    ) {
      setSixDays([]);
      console.log("THis package is not available right now");
      return;
    }
    // Creating Six days data
    while (nextSixDays.length < 6) {
      const date = new Date(today);
      date.setDate(today.getDate() + count);

      const dayName = days[date.getDay()];
      //   Verifying if this day is available for this package
      const monthName = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      count++;
      const dayStr = dayName.slice(0, 3).toLowerCase();
      selectedPackage[dayStr] === 1 &&
        nextSixDays.push({
          dayName: dayName,
          monthName: monthName,
          date: day,
          year: year,
          initialDate: date,
        });
    }

    setSixDays(nextSixDays);
  }

  useEffect(() => {
    getNextSixDays();
  }, [alignment]);

  return (
    <div className="detailsRootContainer">
      <section className="leftBanner hide-in-mobile">
        {resturantDetails.logo && (
          <img src={resturantDetails.logo} alt="" width={300} />
        )}
        {resturantDetails.about_title && resturantDetails.about_description && (
          <Detail
            title={resturantDetails.about_title}
            desc={resturantDetails.about_description}
          />
        )}
        {resturantDetails.food_title && resturantDetails.food_description && (
          <Detail
            title={resturantDetails.food_title}
            desc={resturantDetails.food_description}
          />
        )}
        {resturantDetails.service_area_title &&
          resturantDetails.service_area_description && (
            <Detail
              title={resturantDetails.service_area_title}
              desc={resturantDetails.service_area_description}
            />
          )}
        <footer className=" dFooter leftFooter text-sm">
          <span> CONTACT TAJ MAHAL </span> <br />
          {resturantDetails.public_phone && (
            <span>PHONE: {resturantDetails.public_phone} </span>
          )}
          <br />
          {resturantDetails.public_email && (
            <span>EMAIL: {resturantDetails.public_email}</span>
          )}
        </footer>
      </section>
      <section className="rightDetails bg-#e0e0e0">
        <h4 className="flex">
          <Link to={`/${resturantPublicUrl}`}>
            <ArrowBackIosNewIcon />
          </Link>
          <span className="text-red flex-1">DAILY MENU </span>
        </h4>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          className="touggleButtonGroup"
        >
          {packages.map((pack) => (
            <ToggleButton key={pack.id} value={pack.id} className="text-nowrap">
              {pack.package_name}
            </ToggleButton>
          ))}
          {/* <ToggleButton value="web">Web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">iOS</ToggleButton> */}
        </ToggleButtonGroup>
        {alignment !== 0 && (
          <div className="PackageItemsContainer ">
            {sixDays.map((day) => (
              <PackageItem
                key={day.id}
                day={day}
                selectedPackage={packages.find((pack) => pack.id === alignment)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DailyMenu;
