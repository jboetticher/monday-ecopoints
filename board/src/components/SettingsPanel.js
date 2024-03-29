import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import Button from "monday-ui-react-core/dist/Button";
import Heading from "monday-ui-react-core/dist/Heading";
import Slider from "monday-ui-react-core/dist/Slider";
import Accordion from "monday-ui-react-core/dist/Accordion";
import AccordionItem from "monday-ui-react-core/dist/AccordionItem";

const isProduction = process.env.NODE_ENV === "production";
const endpoint = 'https://us-central1-monday-ecopoints.cloudfunctions.net';

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

    // Get top user
    const personToPoints = props.personToPoints;
    const champion = Object.entries(personToPoints)
      .sort((a, b) => b[1] - a[1])[0];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("tons", carbonPledge.toString());
    urlencoded.append("board", props.boardId);
    urlencoded.append("returnURL", window.location.href.toString());
    urlencoded.append("championId", champion[0]);
    urlencoded.append("championPoints", champion[1].toString());


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const checkoutURL = `${endpoint}/createCheckoutSession`;
    fetch(checkoutURL, requestOptions)
      .then(response => response.json())
      .then(result => {
        window.open(result.url);//, "_blank");
        setCarbonLoading(false);
      })
      .catch(error => console.log('error', error));
  }

  function calculateCarbonPrice(tons) {
    if (tons == null) return 0;

    if (tons < 5) return tons * 5;
    else if (tons < 10) return 20 + (tons - 4) * 3.5;
    else return 39;
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
              <div style={{ fontSize: '36px', width: '40%', color: 'var(--color-success)' }}>${calculateCarbonPrice(carbonPledge).toFixed(2)}</div>
              <div style={{ width: '60%', textAlign: 'right' }}>
                <Button color={Button.colors.POSITIVE} onClick={removeCarbonRequest} loading={carbonLoading}>
                  Remove carbon
                </Button>
              </div>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="How it Works">
          <div className="abox">
            <img 
              src="https://cdn.discordapp.com/attachments/757328909686669362/1000576760611602472/EcopointExplanation.png" 
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <p style={{ marginTop: 0 }}>
              EcoPoints are calculated per month, <b>per board</b>. Any number column can
              be used as EcoPoints (sales, hours on the job, etc).
            </p>
            <p>
              Team members finish their tasks to gain EcoPoints, and in exchange
              Teams pledge to remove carbon.
            </p>

            <p>
              We use a carbon credit market to help teams remove carbon from the air. We only use natural carbon removal 
              credits, which are projects that sequester carbon dioxide through natural processes, like planting trees.
            </p>
            <div style={{ margin: '1rem 1rem 0rem 1rem', display: 'flex', justifyContent: 'center' }}>
              <Button
                color={Button.colors.POSITIVE}
                onClick={() => window.open("https://ecopoints.projk.net", "_blank")}>
                Learn more
              </Button>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Calculate Your Carbon">
          <div className="abox">
            <div>
              Calculate your team's carbon to get a good estimate for achieving carbon neutrality.
            </div>
            <div style={{ margin: '1rem 1rem 0rem 1rem', display: 'flex', justifyContent: 'center' }}>
              <Button
                color={Button.colors.POSITIVE}
                onClick={() => window.open("https://carbonfund.org/take-action/businesses/business-calculators/", "_blank")}>
                Calculate carbon
              </Button>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Troubleshooting">
          <div className="abox">
            <div>
              If your EcoPoints are not loading, be sure to check the settings.
            </div>
            <div>
              The <b>EcoPoint Column</b> must be a number column.
            </div>
            <div>
              The <b>Task Assignee Column</b> must be a people column.
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
