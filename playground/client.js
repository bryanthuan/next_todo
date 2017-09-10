// Copy this and paste in to browser developer tool console.
// Depend on the query and data types 🙂

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
  console.log('data returned:', xhr.response);
}
var query = `query GetMessage($id : ID! ) {
    getMessage(id: $id) {
        author,
        content
    }
  }`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    id: "b6f883d06f5d3cfb7173"
  }
}));