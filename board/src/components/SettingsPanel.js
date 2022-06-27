import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Flex from "monday-ui-react-core/dist/Flex";
import Avatar from "monday-ui-react-core/dist/Avatar";
import Divider from "monday-ui-react-core/dist/Divider";
import Heading from "monday-ui-react-core/dist/Heading";
import Slider from "monday-ui-react-core/dist/Slider";
import Accordion from "monday-ui-react-core/dist/Accordion";
import AccordionItem from "monday-ui-react-core/dist/AccordionItem";

/**
 * props.monday -> monday sdk
 */
const SettingsPanel = props => {

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }

  return (
    <div className="whitepanel">
      <div style={logoContainerStyle}>
        <img
          src="https://cdn.discordapp.com/attachments/426940183112318976/985436645962686504/EcoPointx128.png"
          style={{ margin: 'auto' }}
        />
      </div>

      <p>EcoPoints lets teams save the world one task at a time.</p>


      <Accordion className="monday-storybook-accordion_small-wrapepr" defaultIndex={[0]}>
        <AccordionItem title="Remove Carbon">
          <div className="abox">
            <div>How many tons of carbon do you want to remove?</div>
            <Heading value="Monthly tons pledged" customColor={'black'} type={Heading.types.h4} />
            <Slider />
          </div>
        </AccordionItem>
        <AccordionItem title="How it Works">
          <div className="abox">
            <Heading value="EcoPoints for teams" customColor={'black'} type={Heading.types.h4} />
            <div>
              EcoPoints can be anything. Sales, time spent, or just an arbitrary number. As long 
              as it's a number column in your tasks, you can set it in your settings!
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
          <div>

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
