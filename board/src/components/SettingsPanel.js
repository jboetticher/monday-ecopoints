import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Button from "monday-ui-react-core/dist/Button";
import Heading from "monday-ui-react-core/dist/Heading";
import Slider from "monday-ui-react-core/dist/Slider";
import Accordion from "monday-ui-react-core/dist/Accordion";
import AccordionItem from "monday-ui-react-core/dist/AccordionItem";
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

/*
const app = initializeApp({
  projectId: "monday-ecopoints",
  apiKey: "AIzaSyBXrjZj2_on0RQbbCevUFV_QRZC711gUak",
  authDomain: "monday-ecopoints.firebaseapp.com"
});
const functions = getFunctions(app);
*/
const isProduction = process.env.NODE_ENV === "production";

/**
 * props.monday -> monday sdk
 */
const SettingsPanel = props => {

  const [carbonPledge, setCarbonPledge] = useState(5);
  const [carbonLoading, setCarbonLoading] = useState(false);

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }

  function removeCarbonRequest(e) {
    setCarbonLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("tons", "1");
    urlencoded.append("returnURL", window.location.href.toString());

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const checkoutURL = isProduction ? 
      "https://us-central1-monday-ecopoints.cloudfunctions.net/createCheckoutSession" : 
      "http://localhost:5001/monday-ecopoints/us-central1/createCheckoutSession";
    fetch(checkoutURL, requestOptions)
      .then(response => response.json())
      .then(result => {
        window.open(result.url);//, "_blank");
        setCarbonLoading(false);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="whitepanel">
      <div style={logoContainerStyle}>
        <img
          src="https://cdn.discordapp.com/attachments/757328909686669362/992601138274762762/EcoPoints_Text.png"
          style={{ margin: 'auto', height: "128px", marginBottom: '1rem' }}
        />
      </div>

      <Accordion className="monday-storybook-accordion_small-wrapepr" defaultIndex={[0]}>
        <AccordionItem title="Remove Carbon">
          <div className="abox">
            <div style={{ marginBottom: '2.5rem' }}>How many tons of carbon do you want to remove?</div>
            <Slider
              step={1} min={1} max={10} defaultValue={5} color={Slider.colors.POSITIVE}
              showValue={true} valueFormatter={value => `${value}t`}
              onChange={x => setCarbonPledge(x)}
            />
            <div style={{ marginTop: '1rem' }} />
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: '36px', width: '40%', color: 'var(--color-success)' }}>${carbonPledge * 5}.00</div>
              <div style={{ width: '60%', textAlign: 'right' }}>
                <Button color={Button.colors.POSITIVE} onClick={removeCarbonRequest} loading={carbonLoading}>
                  Remove carbon
                </Button>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              Last pledge fulfilled: 12/12/12
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="How it Works">
          <div className="abox">
            <Heading value="EcoPoints for teams" customColor={'black'} type={Heading.types.h4} />
            <div>
              EcoPoints can be anything and are calculated <b>per board</b>. Sales, time spent, or just an
              arbitrary number. As long as it's a number column in your tasks, you can set it in your settings!
            </div>
            <div>
              Teams pledge to remove carbon in exchange for productivity, and Team Members that
              have the most EcoPoints accrued will gain the most credit!
            </div>
            <Heading value="Carbon captured" customColor={'black'} type={Heading.types.h4} />
            <div>
              We use a carbon credit market to help teams remove carbon from the air.
            </div>
            <div>
              We only purchase natural carbon removal credits, which are projects that sequester
              carbon dioxide through natural processes, like planting trees.
            </div>
            <div>
              Learn more about carbon offsets
              <a href="https://www.southpole.com/carbon-offsets-explained" target="_blank"> here</a>.
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Calculate Your Carbon">
          <div className="abox">
            <div>
              It's important to calculate your team's carbon so that you know what's a good estimate
              for achieving carbon neutrality.
            </div>
            <div>
              A good carbon calculator for businesses is linked
              <a href="https://carbonfund.org/take-action/businesses/business-calculators/" target="_blank"> here</a>.
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Troubleshooting">
          <div className="abox">
            <div>
              If your EcoPoints are not loading, be sure to check the settings. The <b>EcoPoint Column</b> must be a number
              column. The <b>Task Assignee Column</b> must be a people column.
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Donation Type">
          <div className="abox">
            <Heading value="Coming soon..." customColor={'black'} type={Heading.types.h4} />
            <div>We plan to allow teams to donate directly to sustainable initiatives in addition to carbon credits.</div>
            <div>Check back here in a future update!</div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );

}

export default SettingsPanel;
