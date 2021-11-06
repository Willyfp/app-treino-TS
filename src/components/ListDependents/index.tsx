import React, { useEffect } from 'react';
import { FlatListDependents } from './styles';
import ItemList from './ItemList';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Creators as dependentsActions } from '../../store/reducers/Dependents';
import { Dependents } from '../../types/datas';

const mapStateToProps = ({ dependentsReducer }: RootState) => ({
  data: dependentsReducer.getIn(['data']),
});

const mapDispatchToProps = {
  listDependentsRequest: dependentsActions.listDependentsRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ListDependents = ({ listDependentsRequest, data }: PropsFromRedux) => {
  useEffect(() => {
    listDependentsRequest();
  }, []);

  return (
    <FlatListDependents
      data={data as readonly Dependents[]}
      renderItem={({ item }) => <ItemList data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default connector(ListDependents);
