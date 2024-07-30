import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";

import avatar1 from "../../assets/images/avatars/1.jpg";
import avatar2 from "../../assets/images/avatars/2.jpg";
import avatar3 from "../../assets/images/avatars/3.jpg";
import avatar4 from "../../assets/images/avatars/4.jpg";
import avatar5 from "../../assets/images/avatars/5.jpg";
import avatar6 from "../../assets/images/avatars/6.jpg";

import WidgetsBrand from "../widgets/WidgetsBrand";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useEffect, useState } from "react";
import { handleUserRole } from "../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularItems,
  getVendorOrders,
} from "../../actions/vendorReducers/VendorActions";
import { getPageAccess } from "../../actions/customerReducer/CustomerSlice";
import { setPageAccess } from "../../actions/customerReducer/CustomerActions";
import { Progress } from "antd";
import { Slider } from "@nextui-org/react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [itemMax, setItemMax] = useState(10);
  const [cityMax, setCityMax] = useState(10);
  const [packageMax, setPackageMax] = useState(10);
  const [bestItem, setBestItem] = useState([]);
  const [bestPkg, setBestPkg] = useState([]);
  const [bestCities, setBestCities] = useState([]);
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    handleUserRole(["Owner"]);
  }, []);
  const progressExample = [
    { title: "Visits", value: "29.703 Users", percent: 40, color: "success" },
    { title: "Unique", value: "24.093 Users", percent: 20, color: "info" },
    {
      title: "Pageviews",
      value: "78.706 Views",
      percent: 60,
      color: "warning",
    },
    { title: "New Users", value: "22.123 Users", percent: 80, color: "danger" },
    {
      title: "Bounce Rate",
      value: "Average Rate",
      percent: 40.15,
      color: "primary",
    },
  ];

  const progressGroupExample1 = [
    { title: "Monday", value1: 34, value2: 780 },
    { title: "Tuesday", value1: 56, value2: 94 },
    { title: "Wednesday", value1: 12, value2: 67 },
    { title: "Thursday", value1: 43, value2: 91 },
    { title: "Friday", value1: 22, value2: 73 },
    { title: "Saturday", value1: 53, value2: 82 },
    { title: "Sunday", value1: 9, value2: 69 },
  ];

  const progressGroupExample2 = [
    { title: "Male", icon: cilUser, value: 53 },
    { title: "Female", icon: cilUserFemale, value: 43 },
  ];

  const progressGroupExample3 = [
    { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
    { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
    { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
    { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  ];

  const tableExample = [
    {
      avatar: { src: avatar1, status: "success" },
      user: {
        name: "Yiorgos Avraamu",
        new: true,
        registered: "Jan 1, 2021",
      },
      country: { name: "USA", flag: cifUs },
      usage: {
        value: 50,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "success",
      },
      payment: { name: "Mastercard", icon: cibCcMastercard },
      activity: "10 sec ago",
    },
    {
      avatar: { src: avatar2, status: "danger" },
      user: {
        name: "Avram Tarasios",
        new: false,
        registered: "Jan 1, 2021",
      },
      country: { name: "Brazil", flag: cifBr },
      usage: {
        value: 22,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "info",
      },
      payment: { name: "Visa", icon: cibCcVisa },
      activity: "5 minutes ago",
    },
    {
      avatar: { src: avatar3, status: "warning" },
      user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2021" },
      country: { name: "India", flag: cifIn },
      usage: {
        value: 74,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "warning",
      },
      payment: { name: "Stripe", icon: cibCcStripe },
      activity: "1 hour ago",
    },
    {
      avatar: { src: avatar4, status: "secondary" },
      user: { name: "Enéas Kwadwo", new: true, registered: "Jan 1, 2021" },
      country: { name: "France", flag: cifFr },
      usage: {
        value: 98,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "danger",
      },
      payment: { name: "PayPal", icon: cibCcPaypal },
      activity: "Last month",
    },
    {
      avatar: { src: avatar5, status: "success" },
      user: {
        name: "Agapetus Tadeáš",
        new: true,
        registered: "Jan 1, 2021",
      },
      country: { name: "Spain", flag: cifEs },
      usage: {
        value: 22,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "primary",
      },
      payment: { name: "Google Wallet", icon: cibCcApplePay },
      activity: "Last week",
    },
    {
      avatar: { src: avatar6, status: "danger" },
      user: {
        name: "Friderik Dávid",
        new: true,
        registered: "Jan 1, 2021",
      },
      country: { name: "Poland", flag: cifPl },
      usage: {
        value: 43,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "success",
      },
      payment: { name: "Amex", icon: cibCcAmex },
      activity: "Last week",
    },
  ];
  useEffect(() => {
    fetchData();
    fetchPopularItems();
  }, []);
  const fetchPopularItems = async () => {
    try {
      const response = await dispatch(getPopularItems());
      const objMap = new Map();
      const pkgMap = new Map();
      const ctyMap = new Map();

      const items = [];
      const packages = [];

      const cities = [];
      response.data.forEach((item) => {
        if (item.VendorMenuItem) {
          const val = item.VendorMenuItem.id;

          if (objMap.has(val)) {
            const existingObj = objMap.get(val);
            existingObj.total_obj++;
          } else {
            const newObj = {
              item_name: item.VendorMenuItem.item_name,
              total_obj: 1,
              id: item.VendorMenuItem.id,
            };
            objMap.set(val, newObj);
            items.push(newObj);
          }
        }

        // sorting packages

        const pkg = item.CustomerOrder.CustomerPackage.VendorPackage.id;
        if (pkgMap.has(pkg)) {
          const existingObj = pkgMap.get(pkg);
          existingObj.total_obj++;
        } else {
          const newObj = {
            pkg_name:
              item.CustomerOrder.CustomerPackage.VendorPackage.package_name,
            total_obj: 1,
            id: item.CustomerOrder.CustomerPackage.VendorPackage.id,
          };
          pkgMap.set(pkg, newObj);
          packages.push(newObj);
        }
      });
      response.cities.forEach((item) => {
        const cty = item.CitiesAll.id;
        if (ctyMap.has(cty)) {
          const existingObj = ctyMap.get(cty);
          existingObj.total_obj++;
        } else {
          const newObj = {
            city_name: item.CitiesAll.city,
            total_obj: 1,
            id: item.CitiesAll.id,
          };
          ctyMap.set(cty, newObj);
          cities.push(newObj);
        }
      });
      setBestPkg(packages.sort((a, b) => b.total_obj - a.total_obj));
      setPackageMax(
        packages.sort((a, b) => b.total_obj - a.total_obj)[0].total_obj
      );

      setBestCities(cities.sort((a, b) => b.total_obj - a.total_obj));
      setCityMax(cities.sort((a, b) => b.total_obj - a.total_obj)[0].total_obj);

      setBestItem(items.sort((a, b) => b.total_obj - a.total_obj));
      setItemMax(items.sort((a, b) => b.total_obj - a.total_obj)[0].total_obj);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    const response = await dispatch(getVendorOrders());
    setOrders(response.data);
  };
  function nearestHigherPowerOf10(num) {
    let power = 0;
    while (num >= 10) {
      num /= 10;
      power++;
    }
    return Math.pow(10, power + 1); // Return the nearest higher power of 10
  }

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Orders
              </h4>
              <div className="small text-medium-emphasis">
                January - July 2021
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            data={{
              labels: orders.map((item) => item.date),

              datasets: [
                // {
                //   label: "My First dataset",
                //   backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                //   borderColor: getStyle("--cui-info"),
                //   pointHoverBackgroundColor: getStyle("--cui-info"),
                //   borderWidth: 2,
                //   data: [
                //     random(50, 200),
                //     random(50, 200),
                //     random(50, 200),
                //     random(50, 200),
                //     random(50, 200),
                //     random(50, 200),
                //     random(50, 200),
                //   ],
                //   fill: true,
                // },
                {
                  label: "Orders",
                  backgroundColor: "transparent",
                  borderColor: getStyle("--cui-success"),
                  pointHoverBackgroundColor: getStyle("--cui-success"),
                  borderWidth: 2,
                  data: orders.map((item) => item.data.length),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress
                  thin
                  className="mt-2"
                  color={item.color}
                  value={item.percent}
                />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {" & "} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <h3 className="border-b-1 pb-4">Top Items</h3>

                  {bestItem.slice(0, 8).map((item) => (
                    <div className="progress-group mb-4" key={item.id}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                          {item.item_name}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        {/* <CProgress
                          thin
                          color="danger"
                          showValue
                          value={item.total_obj}
                        /> */}
                        <Progress
                          percent={(item.total_obj / itemMax) * 100}
                          strokeColor={"red"}
                          showInfo
                          format={(percent) => `${item.total_obj}/${itemMax}`}
                        />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol>
                  <h3 className="border-b-1 pb-4">Top Packages</h3>
                  {bestPkg.slice(0, 8).map((item) => (
                    <div className="progress-group mb-4" key={item.id}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                          {item.pkg_name}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        {/* <CProgress
                          thin
                          color="warning"
                          showValue
                          value={item.total_obj}
                        /> */}
                        <Progress
                          percent={(item.total_obj / packageMax) * 100}
                          strokeColor={"yellow"}
                          showInfo
                          format={(percent) =>
                            `${item.total_obj}/${packageMax}`
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol>
                  <h3 className="border-b-1 pb-4">Top Cities</h3>
                  {bestCities.slice(0, 8).map((item) => (
                    <div className="progress-group mb-4" key={item.id}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                          {item.city_name}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        {/* <CProgress
                          thin
                          color="success"
                          value={item.total_obj}
                          showValue
                        /> */}
                        <Progress
                          percent={(item.total_obj / cityMax) * 100}
                          strokeColor={"green"}
                          showInfo
                          format={(percent) => `${item.total_obj}/${cityMax}`}
                        />
                      </div>
                    </div>
                  ))}
                </CCol>

                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">
                          New Clients
                        </div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                          {item.title}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol> */}

                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Pageviews
                        </div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Organic
                        </div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}%
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{" "}
                          <span className="text-medium-emphasis small">
                            ({item.percent}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol> */}
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Payment Method
                    </CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src={item.avatar.src}
                          status={item.avatar.status}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? "New" : "Recurring"}</span> |
                          Registered: {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon
                          size="xl"
                          icon={item.country.flag}
                          title={item.country.name}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">
                              {item.usage.period}
                            </small>
                          </div>
                        </div>
                        <CProgress
                          thin
                          color={item.usage.color}
                          value={item.usage.value}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          Last login
                        </div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
