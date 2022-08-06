/**
 * Calculates eco points and other related data.
 * @param {Object} settings The settings of the table/widget from monday.
 * @param {Object} board The data of the board queried from monday.
 */
 export default function processTable(settings, board) {
  let totalPoints = 0, personToPoints = [];

  // Find the column in the data that should correspond to ecopoints.
  let ecoPointColumn = 'numbers';
  if (settings != null && settings.ecopointcolumn != null && settings.ecopointcolumn !== '')
    ecoPointColumn = Object.values(settings.ecopointcolumn)?.[0][0];
  let personColumn = 'person';
  if (settings != null && settings.personcolumn != null && settings.personcolumn !== '')
    personColumn = Object.values(settings.personcolumn)?.[0][0];

  // TODO: remove this override
  console.log('SETTINGS', ecoPointColumn, personColumn)
  console.log("BOAJRD", board)

  // Calculate eco points related data if board data has been provided.
  if (board) {
    for (let b of board.boards) {
      for (let item of b.items) {
        let itemAssignees = [], points;
        for (let column of item.column_values) {
          if (column.id === ecoPointColumn) {
            points = parseInt(column.text);
            if(isNaN(points)) points = 0;
          }
          if (column.id === personColumn) {
            JSON.parse(column.value)?.personsAndTeams
              .filter(x => x.kind === 'person')
              .forEach(x => itemAssignees.push(x.id));
          }
        }
        if (!isNaN(points)) {
          totalPoints += points;
          for (let assignee of itemAssignees) {
            if (personToPoints[assignee] == null) personToPoints[assignee] = points;
            else personToPoints[assignee] += points;
          }
        }
      }
    }
  }

  console.log('PERSON TO POINTS', personToPoints);
  return { totalPoints, personToPoints };
}

