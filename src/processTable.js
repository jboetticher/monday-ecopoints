/**
 * Calculates eco points and other related data.
 * @param {Object} settings The settings of the table/widget from monday.
 * @param {Object} board The data of the board queried from monday.
 */
export default function processTable(settings, board) {
  let totalPoints = 0, pointsToPerson = [];

  // Find the column in the data that should correspond to ecopoints.
  let ecoPointColumn = 'EcoPoints';
  if (settings != null && settings.ecopointcolumn != null && settings.ecopointcolumn !== '')
    ecoPointColumn = settings.ecopointcolumn;

  // Calculate eco points related data if board data has been provided.
  if (board) {
    for (let b of board.boards) {
      for (let item of b.items) {
        let curUsers, points;
        for (let column of item.column_values) {
          if (column.title === ecoPointColumn) {
            points = parseInt(column.text);
          }
          if (column.title === 'Person') {
            curUsers = column.text.split(", ");
          }
        }

        if (!isNaN(points)) {
          totalPoints += points;
          for (let u of curUsers) {
            if (u === '') continue;
            else if (pointsToPerson[u] == null) pointsToPerson[u] = points;
            else pointsToPerson[u] += points;
          }
        }
      }
    }
  }

  return { totalPoints, pointsToPerson };
}

