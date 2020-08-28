import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";
window.gql = gql;

const getClusterDetail = gql`
query getClusterDetail($id: ID!){
  getClusterDetail(id: $id){
    # id
    # name
    partitions{
      # id
      # name
      servers{
        # id
        alias
        name
      }
    }
  }
}
`;

function App(props) {
  console.log('Child2 loading ' + props.getClusterDetail.loading, props);
  if (props.getClusterDetail.loading) {
    return <h5>Child2 loading...</h5>
  }
  return (
    <div style={{ 'whiteSpace': 'pre', fontSize: 5 }}>
      <h5>Child2</h5>
      {JSON.stringify(props.getClusterDetail.getClusterDetail, ' ', 2)}
    </div>
  );
}

export default graphql(getClusterDetail, {
  name: 'getClusterDetail',
  options: props => {
    return {
      variables: {
        id: 'compass-stack',
      },
      fetchPolicy: 'cache-only',
    };
  },
})(App)