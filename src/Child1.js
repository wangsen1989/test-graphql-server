import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";

const getServerDetail = gql`
query getServerDetail($id: String){
  getServerDetail(id: $id){
    id
    alias
    name
  }
}
`;

function App(props) {
  console.log('Child1 loading ' + props.getServerDetail.loading, props);
  if (props.getServerDetail.loading) {
    return <h5>Child1 loading...</h5>
  }
  return (
    <div style={{ 'whiteSpace': 'pre', fontSize: 5 }}>
      <h5>Child1</h5>
      {JSON.stringify(props.getServerDetail.getServerDetail, ' ', 2)}
    </div>
  );
}

export default graphql(getServerDetail, {
  name: 'getServerDetail',
  options: props => {
    return {
      variables: {
        id: 'nginx@Server_app@Partition_compass-stack@Cluster'
      },
      fetchPolicy: 'cache-only',
    };
  },
})(App);
