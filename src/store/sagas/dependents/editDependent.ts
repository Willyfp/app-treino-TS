import { put, takeLatest, select } from '@redux-saga/core/effects';
import { Creators, Types } from '../../reducers/Dependents';
import { Creators as modalActions } from '../../reducers/modalReducer';
import { Action } from 'redux';
import { Dependents } from '../../../types/datas';
import { MaskService } from 'react-native-masked-text';
import { getState } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActionEditDependent extends Action {
  data: Dependents;
}

function* editDependent(props: ActionEditDependent) {
  try {
    const { cpf } = props.data;

    const rawCPF = MaskService.toRawValue('cpf', cpf);

    const {
      dependentsReducer: { data, persistedItem },
      authReducer: { user },
    } = yield select(getState);

    const index = data.findIndex(
      (item: Dependents) => item.id === persistedItem.id,
    );

    let newData = [...data];

    newData[index] = { ...props.data, id: persistedItem.id, cpf: rawCPF };

    yield put(
      modalActions.setModal({
        title: 'Editado',
        message: 'Dependente editado com sucesso!',
        type: 'success',
      }),
    );

    yield AsyncStorage.setItem(
      `dependents@${user.id}`,
      JSON.stringify(newData),
    );

    yield put(Creators.listDependentsSuccess(newData));
    yield put(Creators.persistItemDependent({}));
  } catch (error) {
    yield put(
      modalActions.setModal({
        title: 'ERRO',
        message: 'Falha ao editar dependente!',
        type: 'success',
      }),
    );
    yield put(Creators.listDependentsFailed(error));
    yield put(Creators.setErrorDependents());
  }
}

export default function* watch() {
  yield takeLatest(Types.EDIT_DEPENDENT, editDependent);
}
