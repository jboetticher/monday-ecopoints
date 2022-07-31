/**
 * Calculates eco points and other related data.
 * @param {Object} settings The settings of the table/widget from monday.
 * @param {Object} board The data of the board queried from monday.
 */
export default function processTable(settings, board) {
  let totalPoints = 0, personToPoints = [];

  // Find the column in the data that should correspond to ecopoints.
  let ecoPointColumn = 'EcoPoints';
  if (settings != null && settings.ecopointcolumn != null && settings.ecopointcolumn !== '')
    ecoPointColumn = settings.ecopointcolumn;
  let personColumn = 'Person';
  if (settings != null && settings.personcolumn != null && settings.personcolumn !== '')
    personColumn = settings.personcolumn;

  // TODO: remove this override
  ecoPointColumn = 'EcoPoints';
  personColumn = 'People';
  console.log("BOAJRD", board)

  // Calculate eco points related data if board data has been provided.
  if (board) {
    for (let b of board.boards) {
      for (let item of b.items) {
        let itemAssignees = [], points;
        for (let column of item.column_values) {
          if (column.title === ecoPointColumn) {
            points = parseInt(column.text);
          }
          if (column.title === personColumn) {
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

