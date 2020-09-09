import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";

const getServerDetail = gql`
query getServerDetail($id: String){
  getServerDetail(id: $id){
    alias
    name
  }
}
`;
const query = gql`
query getClusterDetail($id: ID!){
  getClusterDetail(id: $id){
    name
    partitions{
      name
      servers{
        alias
        name
      }
    }
  }
}
`;

function App(props) {
  let { getServerDetail, loading } = props.getServerDetail;
  if (loading) {
    const getClusterDetail = window.client.readQuery({
      query,
      variables: {
        id: 'compass-stack',
    }})
    getServerDetail = getClusterDetail.getClusterDetail.partitions.find(p=>p.name==='app').servers.find(s=>s.name==='nginx');
  }
  return (
    <div style={{ 'whiteSpace': 'pre', fontSize: 5 }}>
      <h5>Child1</h5>
      {JSON.stringify(getServerDetail, ' ', 2)}
    </div>
  );
}

export default graphql(getServerDetail, {
  name: 'getServerDetail',
  options: props => {
    return {
      variables: {
        id: 'nginx'
      },
      fetchPolicy: 'network-only',
    };
  },
})(App);
