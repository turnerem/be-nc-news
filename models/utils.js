const connection = require('../db/connection');

function checkExistenceInOtherTable (sqlColName, msgColName, sqlVal, sqlTable) {
  return connection  
          .select(sqlColName).from(sqlTable)
          .where(sqlColName, sqlVal)
          .then(chkData => {
            
            if (!chkData.length) {
              return Promise.reject({ 
                status: 404, 
                msg: `${msgColName} Not Found`})
            }
            else return []
          })
}

module.exports = checkExistenceInOtherTable