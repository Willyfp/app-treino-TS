import React, { useEffect } from 'react';
import { dataActives } from '../../pages/Actives/fakeData';
import { RootState } from '../../store/reducers';
import ItemList from './ItemList';
import { FlatListActives } from './styles';
import { Creators as activesActions } from '../../store/reducers/Actives';
import { connect, ConnectedProps } from 'react-redux';
import { IActives } from '../../types/datas';
import { ImmutableArray } from 'seamless-immutable';
import { Active } from '../../store/reducers/Actives/types';

const mapStateToProps = ({ activesReducer }: RootState) => ({
  data: activesReducer.getIn(['data']),
});

const mapDispatchToProps = {
  listActivesRequest: activesActions.listActivesRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ListActives = ({ data, listActivesRequest }: PropsFromRedux) => {
  useEffect(() => {
    listActivesRequest();
  }, []);

  return (
    <FlatListActives
      data={data as ImmutableArray<Active>}
      renderItem={({ item }) => <ItemList data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default connector(ListActives);
