import React, { useEffect, useState } from "react";
import "../App.css";
import { Filters } from "../features/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import { getOrganization, selectOrganization } from "../features/organization/organizationSlice";
import { EventsTable } from "../features/events/EventsTable";
import SideNav from "../Headers/SideNav/SideNav";
import { LineChart } from "../features/linechart/LineChart";
import { PieChart } from "../features/piechart/PieChart";
import { Maps } from "../features/maps/Maps";
import { EventsTableWWF } from "../features/events/EventsTableWWF";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const organization = useSelector(selectOrganization);
  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  const [eventComponent, setEventComponent] = useState(null);

  useEffect(() => {
    if (eventComponent !== "CVGL") {
      setEventComponent(<EventsTableWWF />);
    }
    else {
      setEventComponent(<EventsTable />);
    }
  }, [eventComponent]);


  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          
          <div className="main" style={{marginLeft:'0px'}}>
            <header className="header">
              <div className="container">
                <h2 className="header__title">Dashboard</h2>
              </div>
            </header>
            <div className="content">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="card">
                      <div className="card__content">
                        <div className="card__body">
                          <div className="chart">
                          <LineChart />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="card">
                      <div className="card__content">
                        <div className="card__body">
                         <div className="chart">
                         <PieChart />
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card__content">
                        <h3 className="card__title">Maps</h3>
                        <div className="card__body">
                          <Maps />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Filters />
                  </div>
                </div>
                <div className="row">
                 <div className="col-12">
                  {organization.name === "CVGL" ? <EventsTable /> : <EventsTableWWF />}
                 </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
