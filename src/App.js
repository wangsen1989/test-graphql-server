import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";
import Child1 from './Child1';
import Child2 from './Child2';
window.gql = gql;

const getClusterDetail = gql`
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
  console.log('Parent loading ' + props.getClusterDetail.loading, props);
  const [child1Visible, setChild1Visible] = useState(false);
  const [child2Visible, setChild2Visible] = useState(false);
  if (props.getClusterDetail.loading) {
    return 'Parent loading...'
  }
  return (
    <div style={{ 'whiteSpace': 'pre', fontSize: 5 }}>
      <h5>Parent</h5>
      {JSON.stringify(props.getClusterDetail.getClusterDetail, ' ', 2)}
      <button onClick={() => setChild1Visible(!child1Visible)}>加载或隐藏不同查询语句Child1</button>
      <button onClick={() => setChild2Visible(!child2Visible)}>加载或隐藏相同查询语句Child2</button>
      {child1Visible ? <Child1 /> : null}
      {child2Visible ? <Child2 /> : null}
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
      fetchPolicy: 'network-only',
    };
  },
})(App);

