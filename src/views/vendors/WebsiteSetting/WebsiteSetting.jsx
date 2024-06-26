import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteVendorWebsiteSetting,
  getVendorWebsiteSetting,
  setVendorWebsiteSetting,
} from "../../../actions/vendorReducers/VendorActions";
import { FiMoreVertical } from "react-icons/fi";
import { Accordion } from "@mui/material";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
const WebsiteSettings = () => {
  const [infoSection, setInfoSection] = useState([]);
  const [faqSection, setFaqSection] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await dispatch(getVendorWebsiteSetting());
      const info = response.data.filter((item) => item.section_type === "info");
      const faqs = response.data.filter((item) => item.section_type === "faq");

      setInfoSection(info.map((item) => ({ ...item, edit: false })));
      setFaqSection(faqs.map((item) => ({ ...item, edit: false })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditToggle = (index) => {
    setInfoSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].edit = !updatedSections[index].edit;
      return updatedSections;
    });
    setDropdownIndex(null);
  };

  const handleTextChange = (e, index) => {
    const { value } = e.target;
    setInfoSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].description = value;
      return updatedSections;
    });
  };

  const handleSave = async (section) => {
    try {
      const response = await dispatch(setVendorWebsiteSetting(section));
      if (response.success) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteVendorWebsiteSetting(id));
      if (response.success) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHideToggle = async (index) => {
    try {
      const updatedSections = [...infoSection];
      updatedSections[index].show_hide =
        updatedSections[index].show_hide == 1 ? 0 : 1;

      setInfoSection(updatedSections);
      handleSave(updatedSections[index]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleTitleChange = (e, index) => {
    const { value } = e.target;
    setInfoSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].title = value;
      return updatedSections;
    });
  };

  const handleEditFaqToggle = (index) => {
    setFaqSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].edit = !updatedSections[index].edit;
      return updatedSections;
    });
  };
  const handleDeleteFaqButton = (index) => {
    setFaqSection(faqSection.filter((_, i) => i !== index));
  };
  const handleFaqTitleChange = (e, index) => {
    const { value } = e.target;
    setFaqSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].title = value;
      return updatedSections;
    });
  };

  const handleFaqDescriptionChange = (e, index) => {
    const { value } = e.target;
    setFaqSection((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].description = value;
      return updatedSections;
    });
  };
  const addFAQ = () => {
    setFaqSection((prevSections) => {
      const updatedSections = [
        ...prevSections,
        { title: "", description: "", edit: true, section_type: "faq" },
      ];
      return updatedSections;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 bg-white rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Website Settings</h3>
        <p className="mb-8">
          Change your website/store settings where customers place an order
        </p>
        <div>
          {infoSection.map((section, index) => (
            <div key={section.id} className="mb-8">
              {section.edit ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={section.title}
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) => handleTitleChange(e, index)}
                  />
                  <textarea
                    className="w-full p-2 border rounded mb-2"
                    value={section.description}
                    onChange={(e) => handleTextChange(e, index)}
                  />
                  <button
                    className="bg-green-500 w-fit text-white py-1 px-4 rounded"
                    onClick={() => handleSave(section)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-between">
                  <div
                    className={`text-title text-xl mb-2 ${
                      section.show_hide == 1 ? "" : "text-gray-400"
                    }`}
                  >
                    {section.title.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="flex justify-between">
                    <p
                      className={`mb-2 ${
                        section.show_hide == 1 ? "" : "text-gray-400"
                      }`}
                    >
                      {section.description}
                    </p>
                    {section.show_hide == 1 ? (
                      <div className="relative inline-block">
                        <FiMoreVertical
                          className="text-xl cursor-pointer"
                          onClick={() => toggleDropdown(index)}
                        />
                        {dropdownIndex === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleEditToggle(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleHideToggle(index)}
                            >
                              {section.show_hide == 1
                                ? "Hide Section"
                                : "Unhide Section"}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 h-fit w-[100px] text-white py-1 px-4 rounded"
                          onClick={() => {
                            handleHideToggle(index);
                          }}
                        >
                          Unhide section
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg">
        <div className="flex w-full justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h3>
            <p className="mb-8">
              Questions that your customers may have about your services
            </p>
          </div>
          <button
            onClick={addFAQ}
            className="h-fit bg-blue-500 text-white rounded-md py-2 px-4"
          >
            Add FAQ
          </button>
        </div>
        {faqSection.map((section, index) => (
          <div key={section.id} className="mb-8">
            <Accordion defaultExpanded>
              {section.edit ? (
                <>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    className="font-semibold"
                    id="panel3-header"
                  >
                    Edit FAQ
                  </AccordionSummary>
                  <AccordionDetails>
                    <input
                      type="text"
                      value={section.title}
                      className="w-full p-2 border rounded mb-2"
                      onChange={(e) => handleFaqTitleChange(e, index)}
                    />
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={section.description}
                      onChange={(e) => handleFaqDescriptionChange(e, index)}
                    />
                  </AccordionDetails>
                </>
              ) : (
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  className="font-semibold"
                  id="panel3-header"
                >
                  {section.title}
                </AccordionSummary>
              )}
              {!section.edit && (
                <AccordionDetails>{section.description}</AccordionDetails>
              )}

              <AccordionActions>
                {section.edit ? (
                  <span>
                    {section.id ? (
                      <Button
                        style={{
                          color: "red",
                        }}
                        onClick={() => fetchData()}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        style={{
                          color: "red",
                        }}
                        onClick={() => handleDeleteFaqButton(index)}
                      >
                        Delete
                      </Button>
                    )}

                    <Button onClick={() => handleSave(section)}>Save</Button>
                  </span>
                ) : (
                  <div className="flex w-full justify-between">
                    <Button
                      style={{
                        color: "red",
                      }}
                      onClick={() => handleDelete(section.id)}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => handleEditFaqToggle(index)}>
                      Edit
                    </Button>
                  </div>
                )}
              </AccordionActions>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteSettings;
