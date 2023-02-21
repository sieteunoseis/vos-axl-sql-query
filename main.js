const axlService = require("cisco-axl");

// Set up new AXL service
let service = new axlService(
  "10.10.20.1",
  "administrator",
  "ciscopsdt",
  "14.0"
);

(async () => {
  // First we'll get the params needed to call executeSQLQuery
  var operation = "executeSQLQuery";
  var tags = await service.getOperationTags(operation);
  console.log(tags);

  // Next we'll read in our SQL file and update tags with the query
  let sql = "select version from ComponentVersion where softwarecomponent = 'master'"
  tags.sql = sql;
  console.log(tags);

  // Lastly let's execute the query on server
  await service
    .executeOperation(operation, tags)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
})();