import React from 'react'

export default () => (
  <div style={{ textAlign: 'center' }}>
    <img
      src="https://cdn.discordapp.com/attachments/757328909686669362/992601138274762762/EcoPoints_Text.png"
      className='logo'
    />
    <div className='columnBox'>
      <div className='column'>
        <h3>EcoPoints for Monday Teams</h3>
        <img style={{width: '80%'}} src='/EcoPointExplanation.png' />
        <p>
          EcoPoints can be anything and are calculated per board. Sales, time spent, or just an arbitrary number. As long as it's a number column in your tasks, you can set it in your settings!
          Teams pledge to remove carbon in exchange for productivity, and Team Members that have the most EcoPoints accrued will gain the most credit!
        </p>
      </div>
      <div className='column'>
        <h3>Carbon Captured</h3>
        <p>
          We use a carbon credit market to help teams remove carbon from the air.
          We only purchase natural carbon removal credits, which are projects that sequester carbon dioxide through natural processes, like planting trees.
          If you're tech-minded, you can track all of the
          <a href="https://polygonscan.com/address/0x93575BD35b7b4968c87f5AEE5b7FB296E3fE0751"> purchases</a>.
        </p>
        <h3>Friendly Competition</h3>
        <p>
          Incentivize your team to maximize their productivity in the name of helping the environment! Team members who do the best will be immortalized on
          your board's champion leaderboard. Alternatively, up your contribution based on how well your team does. How much you contribute is up to you!
        </p>
      </div>
    </div>
  </div>
)
